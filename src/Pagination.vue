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
      li.page-item(v-for="page in pages", :class="{active: modelValue === page, disabled: isLoading}")
        a.page-link(href="javascript:void(0)", :data-to="page")
          span.spinner-border.spinner-border-sm(v-if="isLoading && page === modelValue")
          span(v-else) {{page}}
          span.sr-only (current)

    li.page-item(v-if="hasNext", :class="hasNext && !isLoading ? '' : 'disabled'")
      a.page-link(href="javascript:void(0)", aria-label="Next Page", :data-to="modelValue < last ? modelValue + 1 : last")
        span.aria-hidden(aria-hidden="true") &rsaquo;
    li.page-item(v-if="hasNext && !isHidePages", :class="hasNext && !isLoading ? '' : 'disabled'")
      a.page-link(href="javascript:void(0)", aria-label="Last Page", :data-to="last")
        span.aria-hidden(aria-hidden="true") &raquo;
</template>

<script>
export default {
  name: 'BluebirdUIPagination',
  props: {
    total: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 20,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Number,
      default: 1,
    },
    isHidePages: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  computed: {
    hasNext() {
      return this.modelValue < this.last;
    },
    hasPrevious() {
      return this.modelValue > 1;
    },
    last() {
      return Math.ceil(this.total / this.perPage);
    },
    pages() {
      let start = this.modelValue > 5 ? this.modelValue - 4 : 1;
      let end = this.modelValue < this.last - 5 ? this.modelValue + 5 : this.last;
      let array = [];
      for (; start <= end; start++) {
        array.push(start);
      }
      return array;
    },
  },
  methods: {
    onClick(event) {
      if (event.target.classList.contains('disabled')) {
        return;
      }
      let to = event.target.getAttribute('data-to');
      if (!to) {
        return;
      }
      to = Number(to);
      if (to === this.modelValue) {
        return;
      }
      this.$emit('change', to);
      this.$emit('update:modelValue', to);
    },
  },
};
</script>
