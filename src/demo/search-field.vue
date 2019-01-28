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

<script>
import PageHeader from '@/page-header';
import SearchField from '@/search-field';
import {sleep} from '@/helper';

export default {
  components: {
    PageHeader,
    SearchField,
  },

  computed: {
    filterOutput() {
      return JSON.stringify(this.filter, null, '  ');
    },
  },

  data() {
    return {
      history: [
        {
          label: 'All Components',
          name: 'home',
        },
      ],

      isSearching: false,
      filter: {
        name: '',
      },
    };
  },

  methods: {
    async refresh() {
      this.isSearching = true;
      await sleep(1000);
      this.isSearching = false;
    },
  },
};
</script>
