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

<script lang="ts">
export default {
  name: 'BluebirdUITextEditor',
}
</script>

<script lang="ts" setup>
import {
  ref,
  onMounted,
  nextTick,
} from 'vue';
import useEditor, {Props as EditorProps} from './mixins/editor';

interface Props extends EditorProps {
  tagName: string;
  type: string;
  isMultiline: boolean;
  placeholder: string;
}

interface StyleObject {
  fontSize: string;
  height: string;
  lineHeight: string;
  color: string;
  fontWeight: string;
  marginBottom: string;
}

const {
  props: baseProps,
  localValue,
  onChange,
  createDefaultValue,
} = useEditor();


const props = withDefaults(defineProps<Props>(), {
  ...baseProps,
  tagName: 'div',
});

const isEditing = ref(false);
const style = ref<StyleObject>({});
const height = ref(null);
const root = ref<HTMLElement>(null);
const input = ref<HTMLInputElement>(null);

onMounted(() => {
  const _style = getComputedStyle(root.value);
  const fontSize = _style.getPropertyValue('font-size');
  const lineHeight = _style.getPropertyValue('line-height');
  const color = _style.getPropertyValue('color');
  const fontWeight = _style.getPropertyValue('font-weight');
  const marginBottom = _style.getPropertyValue('margin-bottom');
  style.value = {
    fontSize,
    lineHeight,
    color,
    fontWeight,
    marginBottom,
    ...props.isMultiline ? null : {
      height: lineHeight,
    },
  };
});

function cancel() {
  localValue.value = props.modelValue;
  isEditing.value = false;
}
function confirm() {
  if (!isEditing.value) {
    return;
  }
  isEditing.value = false;
  onChange();
}
async function startEdit() {
  isEditing.value = true;
  if (props.isMultiline) {
    style.value.height = root.value.offsetHeight + 'px';
  }
  await nextTick();
  input.value.focus();
  if (!props.isMultiline) {
    input.value.select();
  }
}
</script>
