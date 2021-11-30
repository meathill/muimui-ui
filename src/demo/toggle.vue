<template lang="pug">
.toggle-demo
  page-header(
    :history="history",
    title="Toggle",
  )
  toggle(
    v-model="value",
  )

  hr
  p value: {{value}}
  .form-group
    .form-check
      input#check-true.form-check-input(
        type="radio",
        name="check",
        :value="true",
        v-model="value",
      )
      label.form-check-label(for="check-true") True
    .form-check
      input#check-false.form-check-input(
        type="radio",
        name="check",
        :value="false",
        v-model="value",
      )
      label.form-check-label(for="check-false") False
</template>

<script>
import component from '@/demo/component';
import Toggle from '@/Toggle';

export default {
  name: 'ToggleDemo',
  components: {
    Toggle,
  },
  mixins: [component],

  data() {
    return {
      value: false,
    };
  },
};
</script>
