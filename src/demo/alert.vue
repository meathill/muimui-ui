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

<script>
import component from '@/demo/component';
import Alert from '@/alert';
import Toggle from '@/Toggle';

export default {
  components: {
    Toggle,
    Alert,
  },
  mixins: [component],

  data() {
    return {
      timeouts: [
        0,
        100,
        1000,
        5000,
      ],
      message: null,
      status: null,
      timeout: 0,
      value: 'hello world',
    };
  },

  methods: {
    doAlert() {
      this.message = this.value;
    },

    onHide() {
      this.message = null;
    },
  },
};
</script>
