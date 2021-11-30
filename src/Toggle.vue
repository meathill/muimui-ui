<!-- Copyright (C) 2020 by OpenResty Inc. All rights reserved. -->

<template lang="pug">
label.switch(:class="{'switch-disabled': isSaving || disabled}", :title="title")
  input.switch-input(
    type="checkbox",
    :checked="isChecked",
    :id="inputId",
    :disabled="isSaving || disabled",
    @change="onSwitch",
  )
  span.switch-slider
  div.switch-handle
    i.fa.fa-spin.fa-spinner(v-if="isSaving")
    i.fa.fa-check.text-success(v-if="isSuccess && !isSaving")
  span.switch-label(
    :data-on="labelOnText",
    :data-off="labelOffText",
  )
  .alert.alert-danger.position-absolute(v-if="error") {{ error }}
</template>

<script>
export default {
  name: 'BluebirdUIToggle',
  props: {
    modelValue: {
      type: [Boolean, String, Number, Object],
      default: false,
    },
    valueOn: {
      type: [Boolean, String, Number, Object],
      default: true,
    },
    valueOff: {
      type: [Boolean, String, Number, Object],
      default: false,
    },
    labelOn: {
      type: String,
      default: 'On',
    },
    labelOff: {
      type: String,
      default: 'Off',
    },
    id: {
      type: String,
      default: '',
    },
    isSaving: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'toggle',
    },
  },
  emits: ['update:modelValue', 'change'],

  data() {
    return {
      defaultOnText: this.$gettext ? this.$gettext('ON') : 'ON',
      defaultOffText: this.$gettext ? this.$gettext('OFF') : 'OFF',
      isSuccess: null,
      error: '',
    };
  },

  computed: {
    isChecked() {
      return this.localValue === this.valueOn;
    },

    labelOnText() {
      return this.labelOn || this.defaultOnText;
    },
    labelOffText() {
      return this.labelOff || this.defaultOffText;
    },
    localValue() {
      return this.modelValue;
    },
    inputId() {
      return this.id ? 'toggle-' + this.id : null;
    },
  },

  watch: {
    isSuccess(val) {
      if (val) {
        setTimeout(() => {
          this.isSuccess = null;
        }, 2000);
      }
    },
  },

  methods: {
    onSwitch(event) {
      const enabled = event.target.checked;
      this.$emit('update:modelValue', enabled ? this.valueOn : this.valueOff);
      this.$emit('change', enabled, this);
    },
  },
};
</script>
