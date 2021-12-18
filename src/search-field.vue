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
      i.bi.bi-search(v-else)

button.search-field.search-field-button(
  v-else,
  type="button",
  @click="isSearching = true",
)
  i.fas.fa-search.me-2
  span.search-field-label Search by "{{label}}"
</template>

<script lang="ts">
export default {
  name: 'MuimuiUiSearchField',
};
</script>

<script lang="ts" setup>
import debounce from 'lodash/debounce';
import {
  nextTick,
  onBeforeMount,
  ref,
  toRefs,
  watch,
} from "vue";

interface Props {
  isLoading: boolean;
  onlySearch: boolean;
  label?: string;
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  onlySearch: false,
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null):void,
}>();

const {
  isLoading,
  onlySearch,
  label,
  modelValue,
} = toRefs(props);

const isSearching = ref<boolean>(false);
const localValue = ref<string>('');
const search = ref<HTMLInputElement>();

watch(() => modelValue, function (value: Object) {
  localValue.value = value.toString();
  isSearching.value = !!value;
});
watch(() => isSearching, async function (value) {
  if (value) {
    await nextTick();
    search.value?.focus();
  }
});

function doSearch() {
  emit('update:modelValue', localValue.value);
}
function doCancel() {
  if (onlySearch.value) {
    return;
  }
  if (!localValue.value) {
    setTimeout(() => {
      isSearching.value = false;
    }, 400);
  }
}
function doClear() {
  if (localValue.value) {
    localValue.value = '';
    return;
  }
  if (!onlySearch.value) {
    isSearching.value = false;
  }
}
const doAutoSearch = debounce(doSearch, 200);
onBeforeMount(() => {
  if (onlySearch.value) {
    isSearching.value = true;
  }
});
</script>
