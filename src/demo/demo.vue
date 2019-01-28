<template lang="pug">
.demo-list
  .list-group
    router-link.list-group-item.list-group-item-action(
      v-for="item in localRoutes", :key="item.name",
      :to="{name: item.name}",
    ) {{item.title}}
</template>

<script>
import {components} from './router';
export default {
  computed: {
    localRoutes() {
      return components.filter(({title}) => !!title);
    },
  },
};
</script>
