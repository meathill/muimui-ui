<template lang="pug">
nav(aria-label="Page navigation")
  ul.pagination(v-if="last > 1", @click.prevent="onClick")
    li.page-item(v-if="hasPrevious && !isHidePages", :class="hasPrevious && !isLoading ? '' : 'disabled'")
      a.page-link(href="javascript:void(0)", aria-label="First Page", :data-to="1")
        span.aria-hidden(aria-hidden="true") &laquo;

    li.page-item(v-if="hasPrevious", :class="hasPrevious && !isLoading ? '' : 'disabled'")
      a.page-link(href="javascript:void(0)", aria-label="Previous Page", :data-to="modelValue > 1 ? modelValue - 1 : 1")
        span.aria-hidden(aria-hidden="true") &lsaquo;

    template(v-if="!isHidePages")
      li.page-item(
        v-for="page in pages",
        :class="{active: modelValue === page, disabled: isLoading}",
        :aria-current="modelValue === page ? 'page' : null",
      )
        a.page-link(href="javascript:void(0)", :data-to="page")
          span.spinner-border.spinner-border-sm(v-if="isLoading && page === modelValue")
          span(v-else) {{page}}

    li.page-item(v-if="hasNext", :class="hasNext && !isLoading ? '' : 'disabled'")
      a.page-link(href="javascript:void(0)", aria-label="Next Page", :data-to="modelValue < last ? modelValue + 1 : last")
        span.aria-hidden(aria-hidden="true") &rsaquo;
    li.page-item(v-if="hasNext && !isHidePages", :class="hasNext && !isLoading ? '' : 'disabled'")
      a.page-link(href="javascript:void(0)", aria-label="Last Page", :data-to="last")
        span.aria-hidden(aria-hidden="true") &raquo;
</template>

<script lang="ts">
export default {
  name: 'MuimuiUiPagination',
}
</script>

<script lang="ts" setup>
import {
  computed,
  toRefs,
} from "vue";

interface Props {
  total: number;
  perPage: number;
  isLoading: boolean;
  modelValue: number;
  isHidePages: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  total: 0,
  perPage: 20,
  isLoading: false,
  modelValue: 1,
  isHidePages: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number):void,
  (e: 'change', value: number):void,
}>();

const {
  total,
  perPage,
  isLoading,
  modelValue,
  isHidePages,
} = toRefs(props);
const last = computed(() => {
  return Math.ceil(total.value / perPage.value);
});
const hasNext = computed(() => {
  return modelValue.value < last.value;
});
const hasPrevious = computed(() => {
  return modelValue.value > 1;
});
const pages = computed(() => {
  let start = modelValue.value > 5 ? modelValue.value - 4 : 1;
  let end = modelValue.value < last.value - 5 ? modelValue.value + 5 : last.value;
  let array = [];
  for (; start <= end; start++) {
    array.push(start);
  }
  return array;
});

function onClick(event: MouseEvent) {
  if ((event.target as HTMLElement).classList.contains('disabled')) {
    return;
  }
  let to:number = parseInt((event.target as HTMLElement).dataset.to as string);
  if (!to) {
    return;
  }
  to = Number(to);
  if (to === modelValue.value) {
    return;
  }
  emit('change', to);
  emit('update:modelValue', to);
}
</script>
