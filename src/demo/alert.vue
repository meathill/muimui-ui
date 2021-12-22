<template lang="pug">
.alert-demo
  page-header(
    :history="history",
    title="Alert",
  )
  alert(
    :message="message",
    :status="status",
    :auto-hide="timeout",
    @hide="onHide",
  )

  hr
  form.w-25(@submit.prevent="doAlert")
    .form-group.row
      label.col-sm-4.col-form-label.text-right(for="toggle-status") Success
      .col-sm-8.pt-2
        toggle#status(
          v-model="status",
        )
    .form-group
      input.form-control(
        v-model="value",
        placeholder="Message text",
      )
    .form-group
      input.form-control(
        type="number",
        v-model.number="timeout",
        placeholder="Timeout"
        list="timeout-list",
      )

    datalist#timeout-list
      option(v-for="item in timeouts", :value="item")
    button.btn.btn-primary Show alert
</template>

<script lang="ts">
export default {
  name: 'AlertDemo',
}
</script>

<script lang="ts" setup>
import {ref} from 'vue';
import {history} from "@/demo/router";
import PageHeader from "@/page-header.vue";
import Alert from '@/alert.vue';
import Toggle from '@/Toggle.vue';

const timeouts = [
  0,
  100,
  1000,
  5000,
];
const message = ref<Nullable<string>>(null);
const status = ref<Nullable<boolean>>(null);
const timeout = ref<number>(0);
const value = ref<string>('hello world');

function doAlert() {
  message.value = value.value;
}

function onHide() {
  message.value = null;
}
</script>
