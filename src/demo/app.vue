<template lang="pug">
#app.d-flex
  demo-list.col-sm-2
  router-view.col-sm-10
</template>

<script>
import demoList from './demo';
import Manager from '@/mixins/modal';

export default {
  components: {
    demoList,
  },
  mixins: [Manager],
};
</script>
