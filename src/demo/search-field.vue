<template lang="pug">
.search-field-demo
  page-header(
    :history="history",
    :is-title-editor="true",
    title="Search Filed",
  )

  table.table.table-bordered
    thead
      tr
        th ID
        th
          search-field(
            label="Name",
            v-model="filter.name",
            :is-loading="isSearching",
            @input="refresh",
          )
        th
    tbody
      tr
        td 1
        td
          h4 filter:
          pre {{filterOutput}}
        td
</template>

<script lang="ts">
export default {
  name: 'SearchFieldDemo',
};
</script>

<script lang="ts" setup>
import {
  computed,
  ref,
} from "vue";
import {history} from "@/demo/router";
import PageHeader from '@/page-header.vue';
import SearchField from '@/search-field.vue';
import {sleep} from '@/helper';

const isSearching = ref<boolean>(false);
const filter = ref<object>({
  name: '',
});

const filterOutput = computed(() => {
  return JSON.stringify(filter.value, null, '  ');
});

async function refresh() {
  isSearching.value = true;
  await sleep(1000);
  isSearching.value = false;
}
</script>
