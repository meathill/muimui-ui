import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeep';
import defaults from 'lodash/defaults';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';

export default {
  props: {
    modelValue: {
      type: [String, Number, Array, Object],
      default: null,
    },
    inEdit: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      localValue: null,
    };
  },

  watch: {
    modelValue() {
      this.processValue();
    },
  },

  methods: {
    createDefaultValue() {

    },

    processValue() {
      if (!isArray(this.modelValue) && !isPlainObject(this.modelValue)) {
        this.localValue = this.modelValue ? clone(this.modelValue) : this.createDefaultValue();
      } else {
        this.localValue = defaults({}, this.modelValue, this.createDefaultValue());
      }
    },

    onChange() {
      this.$emit('update:modelValue', isArray(this.localValue) || isPlainObject(this.localValue)
        ? cloneDeep(this.localValue) : clone(this.localValue));
    },
  },

  created() {
    this.processValue();
  },
};
