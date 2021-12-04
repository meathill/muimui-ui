<template lang="pug">
button.btn.spin-button(
  :type="type",
  :disabled="status",
)
  span.spinner-border.spinner-border-sm.me-2(v-if="status")
  slot(name="icon")
    i.me-2(
      v-if="icon && !status",
      :class="icon",
    )
  slot {{label}}
</template>

<script>
export default {
  name: 'BluebirdUISpinButton',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    icon: {
      type: String,
      default: null,
    },
    status: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Button',
    },
  },
};
</script>
