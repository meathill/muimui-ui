<template lang="pug">
component(
  v-if="isEditing",
  :is="tagName",
)
  form.text-editor-editing(
    @submit.prevent="confirm",
  )
    textarea.form-control(
      ref="input",
      v-if="isMultiline",
      v-model="localValue",
      rows="4",
      @blur="confirm",
      @keyup.esc="cancel",
      :style="style",
    )
    input.form-control(
      ref="input",
      v-else,
      :type="type",
      v-model="localValue",
      @blur="confirm",
      @keyup.esc="cancel",
      :style="style",
    )

component.text-editor-static(
  v-else-if="inEdit",
  :is="tagName",
  @click="startEdit",
  title="点击编辑",
)
  template(v-if="localValue") {{localValue}}
  slot(v-if="!localValue") (点击编辑)
</template>

<script>
import editor from './mixins/editor';

export default {
  name: 'BluebirdUITextEditor',
  mixins: [editor],

  props: {
    type: {
      type: String,
      default: null,
    },
    tagName: {
      type: String,
      default: 'div',
    },
    isMultiline: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      isEditing: false,

      style: null,
      height: null,
    };
  },

  methods: {
    cancel() {
      this.localValue = this.modelValue;
      this.isEditing = false;
    },
    confirm() {
      if (!this.isEditing) {
        return;
      }
      this.isEditing = false;
      this.onChange();
    },
    createDefaultValue() {
      return '';
    },

    async startEdit() {
      this.isEditing = true;
      if (this.isMultiline) {
        this.style.height = this.$el.offsetHeight + 'px';
      }
      await this.$nextTick();
      this.$refs.input.focus();
      if (!this.isMultiline) {
        this.$refs.input.select();
      }
    },
  },

  mounted() {
    const style = getComputedStyle(this.$el);
    const fontSize = style.getPropertyValue('font-size');
    const lineHeight = style.getPropertyValue('line-height');
    const color = style.getPropertyValue('color');
    const fontWeight = style.getPropertyValue('font-weight');
    const marginBottom = style.getPropertyValue('margin-bottom');
    this.style = {
      fontSize,
      lineHeight,
      color,
      fontWeight,
      marginBottom,
      ...this.isMultiline ? null : {
        height: lineHeight,
      },
    };
  },
};
</script>
