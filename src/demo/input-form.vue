<template lang="pug">
form.extend-trial-period-form(
  ref="form",
  :id="formId",
  @submit.prevent="doSubmit",
)
  .form-group
    label(for="months") Months
    input#months.form-control(
      ref="months",
      type="number",
      v-model.number="months",
      min="1",
      max="120",
      placeholder="Trial period (months)",
      required,
    )

</template>

<script>
export default {
  props: {
    formId: {
      type: String,
      default: null,
    },
    addon: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      months: 0,
    };
  },
  methods: {
    doSubmit() {
      this.$emit('confirm', this.months);
    },
  },
  mounted() {
    this.months = this.addon;
    this.$nextTick()
      .then(() => {
        const {months} = this.$refs;
        months.focus();
        months.select();
      });
  },
};
</script>
