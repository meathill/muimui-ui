<template lang="pug">
.page-header-demo
  page-header(
    :history="history",
    :is-title-editor="true",
    @title-change="onTitleChange",
    :title="title || 'New Item'",
  )

  .container {{title}}

  form(@submit.prevent="doUpdate")
    .form-group
      input.form-control(
        v-model="value",
        placeholder="New title",
      )

    button.btn.btn-primary Update
</template>

<script>
import PageHeader from '../page-header';

export default {
  components: {
    PageHeader,
  },

  data() {
    return {
      history: [
        {
          label: 'All Components',
          name: 'home',
        },
      ],
      title: '',
      value: 'hello',
    };
  },

  methods: {
    doUpdate() {
      this.title = this.value;
    },

    onTitleChange(title) {
      this.title = title;
    },
  },
};
</script>
