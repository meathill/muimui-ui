import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeep';
import defaults from 'lodash/defaults';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import {
  ref,
  watch,
  onBeforeMount,
} from 'vue';

export interface Props {
  modelValue: any;
  inEdit: boolean;
}

export interface EditorMixin {
  props: Props;
  localValue: any;
  onChange: Function;
  createDefaultValue: Function;
}

function basicCreateDefaultValue(): '' {
  return '';
}

export default function useEditor(createDefaultValue: Function = basicCreateDefaultValue):EditorMixin {
  function processValue():void {
    if (!isArray(props.modelValue) && !isPlainObject(props.modelValue)) {
      localValue.value = props.modelValue ? clone(props.modelValue) : createDefaultValue();
    } else {
      localValue.value = defaults({}, props.modelValue, createDefaultValue());
    }
  }

  function onChange() {
    emit('update:modelValue', isArray(localValue.value) || isPlainObject(localValue.value)
      ? cloneDeep(localValue.value) : clone(localValue.value));
  }

  const props = withDefaults(defineProps<Props>(), {
    inEdit: true,
  });
  const emit = defineEmits(['update:modelValue']);
  const localValue = ref<any>(null);

  watch(() => props.modelValue, () => {
    processValue();
  });

  onBeforeMount(() => {
    processValue();
  });

  return {
    props,
    localValue,
    onChange,
    createDefaultValue,
  };
}
