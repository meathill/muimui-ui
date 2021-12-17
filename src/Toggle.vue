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

<script lang="ts">
export default {
  name: 'MuimuiUiToggle',
}
</script>

<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  ref,
  toRefs,
  watchEffect,
} from "vue";

interface Props {
  modelValue: any;
  valueOn: any;
  valueOff: any;
  labelOn: string;
  labelOff: string;
  id: string;
  isSaving: boolean;
  disabled: boolean;
  title: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  valueOn:  true,
  valueOff: false,
  labelOn: 'On',
  labelOff: 'Off',
  id: '',
  isSaving: false,
  disabled: false,
  title: 'toggle',
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void,
  (e: 'change', enabled:boolean, value: ReturnType<typeof getCurrentInstance>): void,
}>();

const {
  modelValue,
  valueOn,
  valueOff,
  labelOn,
  labelOff,
  id,
  isSaving,
  disabled,
  title,
} = toRefs(props);

const localValue = ref<boolean>(false);
const defaultOnText = ref<string>('ON');
const defaultOffText = ref<string>('OFF');
const isSuccess = ref<boolean | null>(null);
const error = ref<string>('');

const isChecked = computed(() => {
  return localValue.value === valueOn.value;
});
const labelOnText = computed(() => {
  return labelOn.value || defaultOnText.value;
});
const labelOffText = computed(() => {
  return labelOff.value || defaultOffText.value;
});
const inputId = computed(() => {
  return id.value ? 'toggle-' + id.value : null;
});

watchEffect(() => {
  if (isSuccess.value) {
    setTimeout(() => {
      isSuccess.value = null;
    }, 2000);
  }
});

function onSwitch(event: Event) {
  const enabled = (event.target as HTMLInputElement).checked;
  const instance = getCurrentInstance();
  emit('update:modelValue', enabled ? valueOn.value : valueOff.value);
  emit('change', enabled, instance);
}
</script>
