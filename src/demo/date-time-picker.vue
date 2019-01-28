<template lang="pug">
.date-time-picker-demo
  page-header(
    :history="history",
    title="Date Time Picker",
  )

  .form-group.row
    label.col-sm-2.text-right.col-form-label(for="normal") Normal
    .col-sm-3
      date-time-picker#normal(
        v-model="value",
      )
    .col-sm-3
      input.form-control-plaintext(
        readonly,
        v-model="value",
      )
  .form-group.row
    label.col-sm-2.text-right.col-form-label(for="disabled") Disabled
    .col-sm-3
      date-time-picker#disabled(
        v-model="value",
        :disabled="disabledComponent",
      )
    .col-sm-3.form-check
      input.form-check-input(type="checkbox", v-model="disabledComponent")
      label.form-check-label Toggle disabled
    .col-sm-3
      input.form-control-plaintext(
        readonly,
        v-model="value",
      )
  .form-group.row
    label.col-sm-2.text-right.col-form-label(for="only-date") Only Date
    .col-sm-3
      date-time-picker#only-date(
        format="YYYY-MM-DD",
        v-model="value2",
      )
    .col-sm-3
      input.form-control-plaintext(
        readonly,
        v-model="value2",
      )
  .form-group.row
    label.col-sm-2.text-right.col-form-label(for="disabled-dates") Disabled Dates
    .col-sm-3
      date-time-picker#disabled-dates(
        format="YYYY-MM-DD",
        v-model="value3",
        :disabled-dates="disabled",
        :disabled-days-of-week="[3]",
      )
    .col-sm-3
      input.form-control-plaintext(
        readonly,
        v-model="value3",
      )
    p.col-sm-10.offset-sm-2.text-muted
      small Disabled yesterday and tomorrow, last day of last month, first day of next month
  .form-group.row
    label.col-sm-2.text-right.col-form-label(for="set-range") Set range
    .col-sm-3
      date-time-picker#set-range(
        format="YYYY-MM-DD",
        v-model="value5",
        :min-date-time="minDateTime",
        :max-date-time="maxDateTime",
      )
    .col-sm-3
      input.form-control-plaintext(
        readonly,
        v-model="value5",
      )
    p.col-sm-10.offset-sm-2.text-muted
      small Set range to 2 weeks from today
    label.col-sm-1.offset-sm-2.col-form-label(for="min-date-time") Min
    .col-sm-3
      date-time-picker#min-date-time(
        v-model="minDateTime"
      )
    label.col-sm-1.text-right.col-form-label(for="max-date-time") Max
    .col-sm-3
      date-time-picker#max-date-time(
        v-model="maxDateTime",
      )
  .form-group.row
    label.col-sm-2.text-right.col-form-label(for="time-range") Time Range
    .col-sm-6
      date-time-picker#time-range(
        v-model="value4",
        is-range,
      )
    .col-sm-4
      input.form-control-plaintext(
        readonly,
        :value="value4.join(', ')",
      )
</template>

<script lang="ts">
export default {
  name: 'DateTimePickerDemo',
}
</script>

<script lang="ts" setup>
import moment from 'moment';
import {history} from "@/demo/router";
import PageHeader from "@/page-header.vue";
import DateTimePicker from '@/DateTimePicker.vue';
import {computed, ref} from "vue";

type tMoment = ReturnType<typeof moment>;
const minDateTime = ref<tMoment>(moment().add(-7, 'days'));
const maxDateTime = ref<tMoment>(moment().add(7, 'days'));
const now = Date.now();
const value = ref<number>(now);
const value2 = ref<number>(now);
const value3 = ref<number>(now);
const value4 = ref<number[]>([
  now,
  now,
]);
const value5 = ref<number>(now);
const disabledComponent = ref<boolean>(false);

const disabled = computed<tMoment[]>(() => {
  const today = new Date();
  const yesterday = moment().add(-1, 'days');
  const tomorrow = moment().add(1, 'days');
  const lastDayOfLastMonth = moment().add(-1 * today.getDate() - 1, 'days');
  const firstDayOfNextMonth = moment()
    .add(1, 'months')
    .add(-1 * today.getDate() + 1, 'days');
  return [yesterday, tomorrow, lastDayOfLastMonth, firstDayOfNextMonth];
});
</script>
