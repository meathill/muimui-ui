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
  isEditMode: boolean;
}

export interface EditorMixin {
  emit: Function;
  localValue: any;
  onChange: Function;
  createDefaultValue: Function;
}

export const defaultProps = {
  isEditing: false,
}

function basicCreateDefaultValue(): '' {
  return '';
}

export default function useEditor(props: Props, emit: Function, createDefaultValue: Function = basicCreateDefaultValue):EditorMixin {
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

  const localValue = ref<any>(null);

  watch(() => props.modelValue, () => {
    processValue();
  });

  onBeforeMount(() => {
    processValue();
  });

  return {
    emit,
    localValue,
    onChange,
    createDefaultValue,
  };
}
