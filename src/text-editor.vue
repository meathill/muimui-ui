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
      :placeholder="placeholder",
    )
    input.form-control(
      ref="input",
      v-else,
      :type="type",
      v-model="localValue",
      @blur="confirm",
      @keyup.esc="cancel",
      :style="style",
      :placeholder="placeholder",
    )

component.text-editor-static(
  v-else,
  ref="el",
  :is="tagName",
  @click="startEdit",
  title="点击编辑",
)
  template(v-if="localValue") {{localValue}}
  slot(v-if="!localValue") (点击编辑)
</template>

<script lang="ts">
export default {
  name: 'MuimuiUiTextEditor',
}
</script>

<script lang="ts" setup>
import {
  ref,
  onMounted,
  nextTick,
  toRefs,
  onBeforeMount,
  watch,
} from 'vue';

interface Props {
  modelValue: string;
  isEditMode?: boolean;
  tagName?: string;
  type?: string;
  isMultiline?: boolean;
  placeholder?: string;
}

interface StyleObject {
  fontSize: string;
  height?: string;
  lineHeight: string;
  color: string;
  fontWeight: string;
  marginBottom: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  tagName: 'div',
  isEditMode: false,
  type: 'text',
  isMultiline: false,
  placeholder: 'value',
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const {
  modelValue,
  tagName,
  type,
  isMultiline,
  placeholder,
} = toRefs(props);

const localValue = ref<string>('');
const isEditing = ref<boolean>(false);
const style = ref<StyleObject>({
  fontSize: '',
  lineHeight: '',
  color: '',
  fontWeight: '',
  marginBottom: '',
});
const el = ref<HTMLElement>();
const input = ref<HTMLInputElement | HTMLTextAreaElement>();

watch(modelValue, value => {
  localValue.value = value;
});

function cancel() {
  localValue.value = modelValue.value;
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
  if (isMultiline.value) {
    style.value.height = el.value?.offsetHeight + 'px';
  }
  await nextTick();
  input.value?.focus();
  if (!isMultiline.value) {
    input.value?.select();
  }
}
function onChange() {
  emit('update:modelValue', localValue.value);
}

onBeforeMount(() => {
  localValue.value = modelValue.value;
});
onMounted(() => {
  if (!el.value) {
    return;
  }
  const _style = getComputedStyle(el.value);
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
    ...isMultiline.value ? null : {
      height: lineHeight,
    },
  };
});
</script>
