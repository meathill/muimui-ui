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

<script>
import component from '@/demo/component';
import SpinButton from '@/spin-button';
import Toggle from '@/Toggle';

export default {
  components: {
    SpinButton,
    Toggle,
  },
  mixins: [component],

  data() {
    return {
      label: 'I am a spin button',
      icon: 'fas fa-check',
      status: null,
    };
  },

  methods: {
    doAlert() {
      this.status = true;
      setTimeout(() => {
        this.status = false;
      }, 1000);
    },
  },
};
</script>
