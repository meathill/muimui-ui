<template lang="pug">
.alert-demo
  page-header(
    :history="history",
    title="Spin Button",
  )
  spin-button.btn-primary(
    :status="status",
    :icon="icon",
    @click.native="doAlert",
  ) {{label}}

  hr
  form.w-50
    .form-group.row
      label.col-sm-4.col-form-label.text-right(for="label") Button label
      .col-sm-8
        input#label.form-control(
          v-model="label",
          placeholder="Button label",
        )
    .form-group.row
      label.col-sm-4.col-form-label.text-right(for="icon") icon
      .col-sm-8
        input#icon.form-control(
          v-model="icon",
          placeholder="Button label",
        )
    .form-group.row
      label.col-sm-4.col-form-label.text-right(for="toggle-is-spin") Spin
      .col-sm-8.pt-2
        toggle#is-spin(
          v-model="status",
        )
</template>

<script lang="ts">
export default {
  name: 'SpinButtonDemo',
}
</script>

<script lang="ts" setup>
import {ref} from "vue";
import {history} from "@/demo/router";
import PageHeader from "@/page-header.vue";
import SpinButton from '@/spin-button.vue';
import Toggle from '@/Toggle.vue';

const label = ref<string>('I am a spin button');
const icon = ref<string>('fas fa-check');
const status = ref<boolean | null>(null);

function doAlert() {
  status.value = true;
  setTimeout(() => {
    status.value = false;
  }, 1000);
}
</script>
