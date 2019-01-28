<template lang="pug">
.toggle-demo
  page-header(
    :history="history",
    title="Toggle",
  )
  pagination(
    :total="total",
    :per-page="perPage",
    :is-loading="isLoading",
    v-model="page",
  )

  pagination(
    :total="total",
    :per-page="perPage",
    :is-hide-pages="true",
    :is-loading="isLoading",
    v-model="page",
  )

  form.w-50
    .form-group.row
      label.col-sm-4.col-form-label.text-right(for="total") Total
      .col-sm-8
        input#total.form-control(
          type="number",
          v-model.number="total",
        )
    .form-group.row
      label.col-sm-4.col-form-label.text-right(for="per-page") Per page
      .col-sm-8
        input#per-page.form-control(
          type="number",
          v-model.number="perPage",
        )
    .form-group.row
      label.col-sm-4.col-form-label.text-right(for="toggle-is-loading") Is loading
      .col-sm-8.pt-2
        toggle#is-loading(
          v-model="isLoading",
        )
    .form-group.row
      label.col-sm-4.col-form-label.text-right(for="page-number") Page number
      .col-sm-8
        input#page-number.form-control(
          type="number",
          v-model.number="page",
          min="1",
        )
</template>

<script>
import component from '@/demo/component';
import Pagination from '@/Pagination';
import Toggle from '@/Toggle';

export default {
  components: {
    Pagination,
    Toggle,
  },
  mixins: [component],

  data() {
    return {
      total: 100,
      perPage: 10,
      isLoading: false,
      page: 1,
    };
  },
};
</script>
