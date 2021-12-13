<template lang="pug">
.demo-list.list-group
  router-link.list-group-item.list-group-item-action(
    v-for="item in localRoutes", :key="item.name",
    :to="{name: item.name}",
  ) {{item.title}}
</template>

<script lang="ts">
export default {
  name: 'DemoView',
};
</script>

<script setup lang="ts">
import {computed} from 'vue';
import {components} from './router';

type Route = {
  title: string;
  name: string;
};

const localRoutes = computed<Array<Route>>(() => {
  return components.filter(({title}: Route) => !!title);
});
</script>
