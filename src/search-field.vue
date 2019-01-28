<template lang="pug">
form.search-field.input-group.input-group-sm(
  v-if="isSearching",
  @submit.prevent="doSearch",
)
  input.form-control.form-control-sm(
    ref="search",
    type="search",
    v-model="localValue",
    :placeholder="'Search by \"' + label + '\"'",
    @keydown.esc="doClear",
    @input="doAutoSearch",
    @blur="doCancel",
  )
  .input-group-append
    button.btn.btn-outline-secondary(
      type="button",
      :disabled="isLoading",
      @click="doSearch",
    )
      span.spinner-border.spinner-border-sm(v-if="isLoading")
      i.fas.fa-search(v-else)

button.search-field.search-field-button(
  v-else,
  type="button",
  @click="isSearching = true",
)
  i.fas.fa-search.mr-2
  span.search-field-label Search by "{{label}}"
</template>

<script>
import debounce from 'lodash/debounce';

export default {
  name: 'BluebirdUISearchField',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    onlySearch: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    modelValue: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      isSearching: false,

      localValue: '',
    };
  },

  watch: {
    modelValue(val) {
      this.localValue = val;
      this.isSearching = !!val;
    },
    isSearching(val) {
      if (val) {
        this.$nextTick()
          .then(() => {
            this.$refs.search.focus();
          });
      }
    },
  },

  methods: {
    doCancel() {
      if (this.onlySearch) {
        return;
      }
      if (!this.localValue) {
        setTimeout(() => {
          this.isSearching = false;
        }, 400);
      }
    },
    doClear() {
      if (this.localValue) {
        this.localValue = '';
        return;
      }
      if (!this.onlySearch) {
        this.isSearching = false;
      }
    },
    doSearch() {
      this.$emit('update:modelValue', this.localValue);
    },

    focus() {
      this.$refs.search.focus();
    },
  },

  beforeMount() {
    this.doAutoSearch = debounce(this.doSearch, 200);
    if (this.onlySearch) {
      this.isSearching = true;
    }
  },

  beforeUnmount() {
    this.doAutoSearch = null;
  },
};
</script>
