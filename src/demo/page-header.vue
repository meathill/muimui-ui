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

<script lang="ts" setup>
import {ref} from 'vue';
import PageHeader from '../page-header';

const history = ref([
  {
    label: 'All Components',
    name: 'home',
  },
]);
const title = ref('');
const value = ref('hello');

function doUpdate() {
  title.value = value.value;
}
function onTitleChange(title: string) {
  title.value = title;
}
</script>
