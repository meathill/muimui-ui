<template lang="pug">
.edge-date-time-picker(:class="{'disabled': disabled}")
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
  button.close(v-if="clearButton && localValue", type="button", @click="localValue = ''")
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
          :class="d.sclass",
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
          :class="{'date-time-picker-dateRange-item-active':baseTime.year() === decade.text}",
          v-text="decade.text",
          @click.stop="yearSelect(decade.text)",
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

<script>
import moment from 'moment';
import locale from 'moment/dist/locale/en-gb';

function toDateString(date) {
  date = date instanceof Date ? date : date.toDate();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
function toMoment(date) {
  return moment(date);
}

export default {
  name: 'BluebirdUIDateTimePicker',
  props: {
    modelValue: {
      type: [Number, Array, Object],
      default: Date.now(),
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disabledDates: {
      type: Array, // Array.<moment>
      default: null,
    },
    disabledDaysOfWeek: {
      type: Array,
      default() {
        return [];
      },
    },
    width: {
      type: String,
      default: null,
    },
    clearButton: {type: Boolean, default: false},
    lang: {type: String, default: navigator.language},
    name: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    locale: {
      type: Object,
      default: null,
    },
    timeText: {
      type: String,
      default: 'Time',
    },
    hourText: {
      type: String,
      default: 'Hour',
    },
    minuteText: {
      type: String,
      default: 'Minute',
    },
    secondText: {
      type: String,
      default: 'Second',
    },
    isRange: {
      type: Boolean,
      default: false,
    },
    separator: {
      type: String,
      default: ' ~ ',
    },
    minDateTime: {
      type: [Number, Object, Date],
      default: null,
    },
    maxDateTime: {
      type: [Number, Object, Date],
      default: null,
    },
  },
  computed: {
    localLocale() {
      return this.locale || locale;
    },
    localDisabledDates() {
      return this.disabledDates ? this.disabledDates.map(date => {
        return toDateString(date);
      }) : [];
    },
    disabledDaysArray() {
      return this.disabledDaysOfWeek.map(d => parseInt(d, 10));
    },
    localRangeStart() {
      return this.isRange
        ? this.localValue[0].clone().add(-1, 'days')
        : toMoment(this.minDateTime).add(-1, 'days');
    },
    localRangeEnd() {
      return this.isRange ? this.localValue[1] : toMoment(this.maxDateTime);
    },
    hasSecond() {
      return /s{1,2}/.test(this.format);
    },
  },
  data() {
    return {
      localValue: null,
      current: 0,
      baseTime: null,
      dateRange: [],
      decadeRange: [],
      displayPopup: false,
      displayDayView: true,
      displayMonthView: false,
      displayYearView: false,
      displayTimePart: true,
      displayTimeView: true,
      displayHourView: false,
      displayMinuteView: false,
      displaySecondView: false,

      hour: '',
      minute: '',
      second: '',
      year: '',
      month: '',
      formatted: '',
      dayHeader: '',
    };
  },
  watch: {
    modelValue() {
      this.processValue();
    },
    minDateTime() {
      if (this.displayDayView) {
        this.getDateRange();
      }
    },
    maxDateTime() {
      if (this.displayDayView) {
        this.getDateRange();
      }
    },
    disabled(val) {
      if (val) {
        this.close();
      }
    },
  },
  methods: {
    close() {
      this.displayPopup = false;
    },
    inputClick({target}) {
      if (!this.disabled) {
        if (this.isRange) {
          const pos = target.selectionStart;
          const mid = target.value.indexOf(this.separator);
          if (pos < mid) {
            target.setSelectionRange(0, mid);
            this.current = 0;
          } else if (pos > mid + 3) {
            target.setSelectionRange(mid + 3, target.value.length);
            this.current = 1;
          }
          this.updateBaseTime();
        }
        this.displayPopup = true;
      }
    },
    preNextDecadeClick(dir = 1) {
      this.baseTime.add(dir * 10, 'years');
      this.getDateRange();
    },
    preNextMonthClick(dir = 1) {
      this.baseTime.add(dir, 'month');
      this.month = this.baseTime.month();
      this.dayHeader = this.baseTime.format('MMM YYYY');
      this.getDateRange();
    },
    preNextYearClick(dir) {
      this.baseTime.add(dir, 'year');
      this.getDateRange();
      this.year = this.baseTime.year();
    },
    yearSelect(year) {
      this.displayYearView = false;
      this.displayMonthView = true;
      this.baseTime.year(year);
      this.year = this.baseTime.year();
    },
    monthSelect(index) {
      this.displayMonthView = false;
      this.displayDayView = true;
      this.baseTime.month(index);
      this.month = index;
      this.getDateRange();
      this.dayHeader = this.baseTime.format('MMM YYYY');
    },
    daySelect(day) {
      if (day.sclass === 'date-time-picker-item-disable') {
        return false;
      }

      const {date} = day;
      date.setHours(this.baseTime.hour());
      date.setMinutes(this.baseTime.minute());
      date.setSeconds(this.baseTime.second());
      this.baseTime.year(date.getFullYear());
      this.baseTime.month(date.getMonth());
      this.baseTime.date(date.getDate());
      this.update();
      this.getDateRange();
    },
    selectHour(hour) {
      this.baseTime.hour(hour);
      this.update();
      this.displayHourView = false;
      this.displayTimeView = true;
    },
    selectMinute(minute) {
      this.baseTime.minute(minute);
      this.update();
      this.displayMinuteView = false;
      this.displayTimeView = true;
    },
    selectSecond(second) {
      this.baseTime.second(second);
      this.update();
      this.displaySecondView = false;
      this.displayTimeView = true;
    },
    switchMonthView() {
      this.displayDayView = false;
      this.displayMonthView = true;
    },
    switchDecadeView() {
      this.displayMonthView = false;
      this.displayYearView = true;
    },
    switchHourView() {
      this.displayTimeView = this.displayMinuteView = this.displaySecondView = false;
      this.displayHourView = true;
    },
    switchMinuteView() {
      this.displayTimeView = this.displayHourView = this.displaySecondView = false;
      this.displayMinuteView = true;
    },
    switchSecondView() {
      this.displayTimeView = this.displayHourView = this.displayMinuteView = false;
      this.displaySecondView = true;
    },
    getYearMonth(year, month) {
      if (month > 11) {
        year++;
        month = 0;
      } else if (month < 0) {
        year--;
        month = 11;
      }
      return {year: year, month: month};
    },
    getDayCount(year, month) {
      const dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (month === 1) {
        if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
          return 29;
        }
      }
      return dict[month];
    },
    getDateRange() {
      this.decadeRange = [];
      const year = this.baseTime.year();
      const month = this.baseTime.month();
      const todayStr = toDateString(this.localValue[this.current]);
      const firstYearOfDecade = (year / 10 >> 0) * 10 - 1;
      for (let i = 0; i < 12; i++) {
        this.decadeRange.push({
          text: firstYearOfDecade + i,
        });
      }
      if (this.displayYearView) {
        return;
      }

      this.dateRange = [];
      const currMonthFirstDay = new Date(year, month, 1);
      let firstDayWeek = currMonthFirstDay.getDay() + 1;
      if (firstDayWeek === 0) {
        firstDayWeek = 7;
      }
      const dayCount = this.getDayCount(year, month);
      if (firstDayWeek > 1) {
        const preMonth = this.getYearMonth(year, month - 1);
        const prevMonthDayCount = this.getDayCount(preMonth.year, preMonth.month);
        for (let i = 1; i < firstDayWeek; i++) {
          const dayText = prevMonthDayCount - firstDayWeek + i + 1;
          const date = new Date(preMonth.year, preMonth.month, dayText);
          let sclass = this.getDateItemClass({
            date,
            todayStr,
            className: 'date-time-picker-item-gray',
          });
          this.dateRange.push({text: dayText, date, sclass});
        }
      }

      for (let i = 1; i <= dayCount; i++) {
        const date = new Date(year, month, i);
        let sclass = this.getDateItemClass({
          date,
          todayStr,
        });
        this.dateRange.push({text: i, date, sclass});
      }

      if (this.dateRange.length < 42) {
        const nextMonthNeed = 42 - this.dateRange.length;
        const nextMonth = this.getYearMonth(year, month + 1);

        for (let i = 1; i <= nextMonthNeed; i++) {
          const date = new Date(nextMonth.year, nextMonth.month, i);
          let sclass = this.getDateItemClass({
            date,
            todayStr,
            className: 'date-time-picker-item-gray',
          });
          this.dateRange.push({text: i, date, sclass});
        }
      }
    },
    getDateItemClass({date, todayStr, className = ''}) {
      const {
        disabledDaysArray,
        localDisabledDates,
        localRangeStart,
        localRangeEnd,
        current,
        isRange,
      } = this;
      const str = toDateString(date);
      const isOutOfRange = isRange
        ? date > localRangeEnd && current === 0 || date < localRangeStart && current === 1
        : date < localRangeStart || date > localRangeEnd;
      if (disabledDaysArray.indexOf(date.getDay()) > -1
          || localDisabledDates.indexOf(str) !== -1
          || isOutOfRange) {
        className = 'date-time-picker-item-disable';
      }
      if (str === todayStr
          || isRange && date >= localRangeStart && date < localRangeEnd) {
        className = 'date-time-picker-dateRange-item-active';
      }
      return className;
    },
    stringifyDecadeHeader() {
      const year = this.baseTime.year();
      const firstYearOfDecade = (year / 10 >> 0) * 10;
      const lastYearOfDecade = firstYearOfDecade + 10;
      return firstYearOfDecade + '-' + lastYearOfDecade;
    },
    update(isUpdate = true) {
      this.formatted = this.localValue.map(time => time.format(this.format)).join(this.separator);
      if (isUpdate) {
        this.localValue[this.current] = this.baseTime.clone();
        const value = this.localValue.map(time => time.valueOf());
        this.$emit('update:modelValue', this.isRange ? value : value[0]);
      } else {
        this.updateBaseTime();
      }
    },
    updateBaseTime() {
      const value = this.localValue[this.current];
      this.baseTime = value.clone();
      this.dayHeader = this.baseTime.format('MMM YYYY');
      this.year = this.baseTime.year();
      this.month = this.baseTime.month();
      this.hour = this.baseTime.format('HH');
      this.minute = this.baseTime.format('mm');
      this.second = this.baseTime.format('ss');
      if (this.displayDayView) {
        this.getDateRange();
      }
    },
    increase(key) {
      this.baseTime.add(1, key);
      this.update();
    },
    decrease(key) {
      this.baseTime.add(-1, key);
      this.update();
    },
    processValue() {
      if (this.isRange) {
        const value = [];
        for (let i = 0; i < 2; i++) {
          value.push(toMoment(this.modelValue[i] || new Date()));
        }
        this.localValue = value;
      } else {
        this.localValue = [toMoment(this.modelValue || new Date())];
      }
      this.update(false);
    },
  },
  beforeMount() {
    this.processValue();
    this.update(false);
    this.displayDayView = /[YyMD]/.test(this.format);
    this.displayTimePart = /[HhmsS]/.test(this.format);
    this._blur = e => {
      if (!this.$el.contains(e.target)) {
        this.close();
      }
    };
    window.addEventListener('click', this._blur);
    this.getDateRange();
  },
  beforeUnmount() {
    window.removeEventListener('click', this._blur);
  },
};
</script>
