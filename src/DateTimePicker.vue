<template lang="pug">
.muimui-date-time-picker(
  ref="root",
  :class="{'disabled': disabled}",
)
  input.form-control.date-time-picker-input(
    readonly,
    :value="formatted",
    :id="id",
    :class="{'with-reset-button': clearButton}",
    :name="name",
    :placeholder="placeholder",
    :style="{width:width}",
    @click="inputClick",
  )
  button.close(v-if="clearButton && localValue", type="button", @click="doClear")
    span &times;

  .date-time-picker-popup(
    v-if="displayPopup",
    :class="{'has-second': hasSecond, 'has-time': displayTimePart}",
  )
    .left(v-show="displayDayView")
      .date-time-picker-ctrl
        span.date-time-picker-pre-button(
          aria-hidden="true",
          @click="preNextMonthClick(-1)",
        ) ‹
        span.date-time-picker-next-button(
          aria-hidden="true",
          @click="preNextMonthClick(1)",
        ) ›
        p(@click="switchMonthView") {{dayHeader}}
      .date-time-picker-weekRange
        span(v-for="w in localLocale._weekdaysMin") {{w}}
      .date-time-picker-dateRange
        span(
          v-for="d in dateRange",
          :class="d.sClass",
          @click="daySelect(d)",
        ) {{d.text}}

    .left(v-show="displayMonthView")
      .date-time-picker-ctrl
        span.date-time-picker-pre-button(
          aria-hidden="true",
          @click="preNextYearClick(-1)",
        ) ‹
        span.date-time-picker-next-button(
          aria-hidden="true",
          @click="preNextYearClick(1)",
        ) ›
        p(@click="switchDecadeView") {{year}}
      .date-time-picker-monthRange
        span(
          v-for="(m, index) in localLocale._months",
          v-text="m.substr(0,3)",
          :class="{'date-time-picker-dateRange-item-active': baseTime.month() === index && baseTime.year() === baseTime.year()}",
          @click="monthSelect(index)",
        )

    .left(v-show="displayYearView")
      .date-time-picker-ctrl
        span.date-time-picker-pre-button(
          aria-hidden="true",
          @click="preNextDecadeClick(-1)",
        ) ‹
        span.date-time-picker-next-button(
          aria-hidden="true",
          @click="preNextDecadeClick(1)",
        ) ›
        p {{stringifyDecadeHeader()}}
      .date-time-picker-monthRange.decadeRange
        span(
          v-for="decade in decadeRange",
          :class="{'date-time-picker-dateRange-item-active': baseTime.year() === decade}",
          v-text="decade",
          @click.stop="yearSelect(decade)",
        )

    .right(v-if="displayTimePart")
      .date-time-picker-time(v-show="displayTimeView")
        .date-time-picker-ctrl {{timeText}}
        .date-time-picker-clock
          .date-time-picker-scroll
            button.btn.btn-default.rotate-90(
              type="button",
              @click="increase('hour')",
            ) ‹
            span(@click.stop="switchHourView") {{hour}}
            button.btn.btn-default.rotate-90(
              type="button",
              @click="decrease('hour')",
            ) ›
          .vertical-division :
          .date-time-picker-scroll
            button.btn.btn-default.rotate-90(
              type="button",
              @click="increase('minute')",
            ) ‹
            span(@click.stop="switchMinuteView") {{minute}}
            button.btn.btn-default.rotate-90(
              type="button",
              @click="decrease('minute')",
            ) ›
          template(v-if="hasSecond")
            .vertical-division :
            .date-time-picker-scroll
              button.btn.btn-default.rotate-90(
                type="button",
                @click="increase('second')",
              ) ‹
              span(@click.stop="switchSecondView") {{second}}
              button.btn.btn-default.rotate-90(
                type="button",
                @click="decrease('second')",
              ) ›

      .date-time-picker-hour(v-show="displayHourView")
        .date-time-picker-ctrl {{hourText}}
        span(
          v-for="n in 24",
          @click.stop="selectHour(n - 1)",
        ) {{n - 1}}
      .date-time-picker-minute(v-show="displayMinuteView")
        .date-time-picker-ctrl {{minuteText}}
        span(
          v-for="n in 60",
          @click.stop="selectMinute(n - 1)",
        ) {{n - 1}}
      .date-time-picker-minute(v-show="displaySecondView")
        .date-time-picker-ctrl {{secondText}}
        span(
          v-for="n in 60",
          @click.stop="selectSecond(n - 1)",
        ) {{n - 1}}
</template>

<script lang="ts">
export default {
  name: 'MuimuiUiDateTimePicker',
}
</script>

<script lang="ts" setup>
import isArray from "lodash/isArray";
import isString from 'lodash/isString';
import moment from 'moment';
// @ts-ignore
import defaultLocal from 'moment/dist/locale/en-gb';
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  toRefs,
  watch,
} from "vue";
import DurationConstructor = moment.unitOfTime.DurationConstructor;

type Moment = ReturnType<typeof moment>;
type DateDisplayItem = {
  text: string;
  date: Date;
  sClass?: string;
};
type DateRange = [Moment] | [Moment, Moment];
type DateTypes = Date | Moment | string;
type RangeIndex = 0 | 1;
type Momentable = Nullable<Date | Moment | string | number>;
interface Props {
  modelValue?: number | number[] | Date | Date[] | string | string[];
  format: string;
  disabled: boolean;
  disabledDates?: DateTypes[] | string;
  disabledDaysOfWeek?: number[] | string;
  width?: string;
  clearButton: boolean;
  lang: string;
  name: string;
  id?: string;
  placeholder?: string;
  locale?: any;
  timeText: string;
  hourText: string;
  minuteText: string;
  secondText: string;
  isRange: boolean;
  separator: string;
  minDateTime?: Momentable;
  maxDateTime?: Momentable;
}
interface YearMonth {
  year: number;
  month: number;
}

function toDateString(date: DateTypes):string {
  if (isString(date)) {
    return date;
  }
  date = date instanceof Date ? date : date.toDate();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
function toMoment(date: Date | Moment | number | string):Moment {
  return moment(date);
}

const now = Date.now();
const m = moment();
const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  format: 'YYYY-MM-DD HH:mm:ss',
  disabled: false,
  disabledDates: undefined,
  disabledDaysOfWeek: undefined,
  clearButton: false,
  lang: navigator.language,
  timeText: 'Time',
  hourText: 'Hour',
  minuteText: 'Minute',
  secondText: 'Second',
  isRange: false,
  separator: ' ~ ',
  minDateTime: null,
  maxDateTime: null,
});
const emit = defineEmits<{
  (e:'update:modelValue', value:number | number[]):void,
}>();
const {
  modelValue,
  format,
  disabled,
  disabledDates,
  disabledDaysOfWeek,
  width,
  clearButton,
  lang,
  name,
  id,
  placeholder,
  locale,
  timeText,
  hourText,
  minuteText,
  secondText,
  isRange,
  separator,
} = toRefs(props);
const minDateTime = ref<DateTypes>(m);
const maxDateTime = ref<DateTypes>(m);
if (!modelValue.value) {
  modelValue.value = now;
}
const localValue = ref<DateRange>([m, m]);
const current = ref<RangeIndex>(0);
const baseTime = ref<Moment>(m);
const dateRange = ref<DateDisplayItem[]>([]);
const decadeRange = ref<number[]>([]);
const displayPopup = ref<boolean>(false);
const displayDayView = ref<boolean>(true);
const displayMonthView = ref<boolean>(false);
const displayYearView = ref<boolean>(false);
const displayTimePart = ref<boolean>(true);
const displayTimeView = ref<boolean>(true);
const displayHourView = ref<boolean>(false);
const displayMinuteView = ref<boolean>(false);
const displaySecondView = ref<boolean>(false);

const hour = ref<string>('');
const minute = ref<string>('');
const second = ref<string>('');
const year = ref<number>();
const month = ref<number>();
const formatted = ref<string>('');
const dayHeader = ref<string>('');

const root = ref<HTMLDivElement>();

const localLocale = computed(() => {
  return locale.value || defaultLocal;
});
const localDisabledDates = computed<string[]>(() => {
  if (!disabledDates.value) return [];
  const {value} = disabledDates;
  let arr = isString(value) ? value.replace(/(^\[|]$)/g, '').split(',') : value;
  return arr.map((item:DateTypes) => {
    return toDateString(item);
  });
});
const disabledDaysArray = computed<number[]>(() => {
  if (!disabledDaysOfWeek.value) return [];
  if (isString(disabledDaysOfWeek.value)) {
    return disabledDaysOfWeek.value
      .replace(/(^\[|]$)/g, '')
      .split(',').map((day:string) => {
        return parseInt(day, 10);
      });
  }
  return disabledDaysOfWeek.value;
});
const localRangeStart = computed<Moment>(() => {
  return isRange.value
    ? localValue.value[0].clone().add(-1, 'days')
    : toMoment(minDateTime.value).add(-1, 'days');
});
const localRangeEnd = computed<Moment>(() => {
  return isRange.value && localValue.value[1] ? localValue.value[1] : toMoment(maxDateTime.value);
});
const hasSecond = computed<boolean>(() => {
  return /s{1,2}/.test(format.value);
});

function doClear() {
  emit('update:modelValue', 0);
  formatted.value = '';
}
function close() {
  displayPopup.value = false;
}
function inputClick(event:InputEvent) {
  const target = event.target as HTMLInputElement;
  if (!disabled.value) {
    if (isRange.value) {
      const pos = target.selectionStart || 0;
      const mid = target.value.indexOf(separator.value);
      if (pos < mid) {
        target.setSelectionRange(0, mid);
        current.value = 0;
      } else if (pos > mid + 3) {
        target.setSelectionRange(mid + 3, target.value.length);
        current.value = 1;
      }
      updateBaseTime();
    }
    displayPopup.value = true;
  }
}
function preNextDecadeClick(dir:number = 1) {
  baseTime.value.add(dir * 10, 'years');
  getDateRange();
}
function preNextMonthClick(dir:number = 1) {
  baseTime.value.add(dir, 'month');
  month.value = baseTime.value.month();
  dayHeader.value = baseTime.value.format('MMM YYYY');
  getDateRange();
}
function preNextYearClick(dir:number = 1) {
  baseTime.value.add(dir, 'year');
  getDateRange();
  year.value = baseTime.value.year();
}
function yearSelect(toYear:number) {
  displayYearView.value = false;
  displayMonthView.value = true;
  baseTime.value.year(toYear);
  year.value = baseTime.value.year();
}
function monthSelect(toMonth:number) {
  displayMonthView.value = false;
  displayDayView.value = true;
  baseTime.value.month(toMonth);
  month.value = toMonth;
  getDateRange();
  dayHeader.value = baseTime.value.format('MMM YYYY');
}
function daySelect(day:DateDisplayItem) {
  if (day.sClass === 'date-time-picker-item-disable') {
    return false;
  }

  const {date} = day;
  date.setHours(baseTime.value.hour());
  date.setMinutes(baseTime.value.minute());
  date.setSeconds(baseTime.value.second());
  baseTime.value.year(date.getFullYear());
  baseTime.value.month(date.getMonth());
  baseTime.value.date(date.getDate());
  update();
  getDateRange();
}
function selectHour(hour:number) {
  baseTime.value.hour(hour);
  update();
  displayHourView.value = false;
  displayTimeView.value = true;
}
function selectMinute(minute:number) {
  baseTime.value.minute(minute);
  update();
  displayMinuteView.value = false;
  displayTimeView.value = true;
}
function selectSecond(second:number) {
  baseTime.value.second(second);
  update();
  displaySecondView.value = false;
  displayTimeView.value = true;
}
function switchMonthView() {
  displayDayView.value = false;
  displayMonthView.value = true;
}
function switchDecadeView() {
  displayMonthView.value = false;
  displayYearView.value = true;
}
function switchHourView() {
  displayTimeView.value = displayMinuteView.value = displaySecondView.value = false;
  displayHourView.value = true;
}
function switchMinuteView() {
  displayTimeView.value = displayHourView.value = displaySecondView.value = false;
  displayMinuteView.value = true;
}
function switchSecondView() {
  displayTimeView.value = displayHourView.value = displayMinuteView.value = false;
  displaySecondView.value = true;
}
function getYearMonth(year:number, month:number):YearMonth {
  if (month > 11) {
    year++;
    month = 0;
  } else if (month < 0) {
    year--;
    month = 11;
  }
  return {year, month};
}
function getDayCount(year:number, month:number):number {
  const dict:number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 1) {
    if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
      return 29;
    }
  }
  return dict[month];
}
function getDateRange() {
  decadeRange.value = [];
  const year = baseTime.value.year();
  const month = baseTime.value.month();
  const text = toDateString(localValue.value[current.value] as Moment);
  const firstYearOfDecade:number = (year / 10 >> 0) * 10 - 1;
  for (let i = 0; i < 12; i++) {
    decadeRange.value.push(firstYearOfDecade + i);
  }
  if (displayYearView.value) {
    return;
  }

  dateRange.value = [];
  const currMonthFirstDay = new Date(year, month, 1);
  let firstDayWeek = currMonthFirstDay.getDay() + 1;
  if (firstDayWeek === 0) {
    firstDayWeek = 7;
  }
  const dayCount = getDayCount(year, month);
  if (firstDayWeek > 1) {
    const preMonth = getYearMonth(year, month - 1);
    const prevMonthDayCount = getDayCount(preMonth.year, preMonth.month);
    for (let i = 1; i < firstDayWeek; i++) {
      const day = prevMonthDayCount - firstDayWeek + i + 1;
      const date = new Date(preMonth.year, preMonth.month, day);
      let sClass = getDateItemClass({
        date,
        text,
        sClass: 'date-time-picker-item-gray',
      });
      dateRange.value.push({text: day.toString(), date, sClass});
    }
  }

  for (let i = 1; i <= dayCount; i++) {
    const date = new Date(year, month, i);
    let sClass = getDateItemClass({
      date,
      text,
    });
    dateRange.value.push({text: i.toString(), date, sClass});
  }

  if (dateRange.value.length < 42) {
    const nextMonthNeed = 42 - dateRange.value.length;
    const nextMonth = getYearMonth(year, month + 1);

    for (let i = 1; i <= nextMonthNeed; i++) {
      const date = new Date(nextMonth.year, nextMonth.month, i);
      let sClass = getDateItemClass({
        date,
        text,
        sClass: 'date-time-picker-item-gray',
      });
      dateRange.value.push({text: i.toString(), date, sClass});
    }
  }
}
function getDateItemClass({date, text, sClass = ''}:DateDisplayItem) {
  let className = sClass;
  const str = toDateString(date);
  const isOutOfRange = isRange.value
    ? date.valueOf() > localRangeEnd.value.valueOf() && current.value === 0
      || date.valueOf() < localRangeStart.value.valueOf() && current.value === 1
    : date.valueOf() < localRangeStart.value.valueOf()
      || date.valueOf() > localRangeEnd.value.valueOf();
  if (disabledDaysArray.value.indexOf(date.getDay()) > -1
      || localDisabledDates.value.indexOf(str) !== -1
      || isOutOfRange) {
    className = 'date-time-picker-item-disable';
  }
  if (str === text
      || isRange
         && date.valueOf() >= localRangeStart.value.valueOf()
         && date.valueOf() < localRangeEnd.value.valueOf()) {
    className = 'date-time-picker-dateRange-item-active';
  }
  return className;
}
function stringifyDecadeHeader() {
  const year = baseTime.value.year();
  const firstYearOfDecade = (year / 10 >> 0) * 10;
  const lastYearOfDecade = firstYearOfDecade + 10;
  return firstYearOfDecade + '-' + lastYearOfDecade;
}
function update(isUpdate = true) {
  formatted.value = localValue.value.map(time => time.format(format.value)).join(separator.value);
  if (isUpdate) {
    localValue.value[current.value] = baseTime.value.clone();
    const value = localValue.value.map(time => time.valueOf());
    emit('update:modelValue', isRange.value ? value : value[0]);
  } else {
    updateBaseTime();
  }
}
function updateBaseTime() {
  const value = localValue.value[current.value];
  if (!value) return;
  baseTime.value = value.clone();
  dayHeader.value = baseTime.value.format('MMM YYYY');
  year.value = baseTime.value.year();
  month.value = baseTime.value.month();
  hour.value = baseTime.value.format('HH');
  minute.value = baseTime.value.format('mm');
  second.value = baseTime.value.format('ss');
  if (displayDayView.value) {
    getDateRange();
  }
}
function increase(key:DurationConstructor) {
  baseTime.value.add(1, key);
  update();
}
function decrease(key:DurationConstructor) {
  baseTime.value.add(-1, key);
  update();
}
function processValue() {
  if (isRange.value) {
    let start;
    let end;
    if (isArray(modelValue.value)) {
      ([start, end] = modelValue.value);
    } else {
      start = modelValue.value;
      end = modelValue.value;
    }
    localValue.value = [toMoment(start), toMoment(end)];
  } else {
    const value = isArray(modelValue.value) ? modelValue.value[0] : modelValue.value;
    localValue.value = [toMoment(value || new Date())];
  }
  update(false);
}

watch(modelValue, () => {
  processValue();
});
watch(minDateTime, () => {
  if (displayDayView.value) {
    getDateRange();
  }
});
watch(maxDateTime, () => {
  if (displayDayView.value) {
    getDateRange();
  }
});
watch(disabled, (val) => {
  if (val) {
    close();
  }
});

let onBlur:Nullable<FocusHandler> = null;
onBeforeMount(() => {
  processValue();
  update(false);
  displayDayView.value = /[YyMD]/.test(format.value);
  displayTimePart.value = /[HhmsS]/.test(format.value);
  onBlur = (e:FocusEvent) => {
    if (!(root.value as HTMLElement).contains(e.target as HTMLElement)) {
      close();
    }
  };
  window.addEventListener('click', onBlur);
  getDateRange();
});
onBeforeUnmount(() => {
  window.removeEventListener('click', onBlur as FocusHandler);
  onBlur = null;
});
</script>
