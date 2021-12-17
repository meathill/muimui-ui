<template lang="pug">
nav#navbar.navbar.navbar-extend-lg.navbar-dark.bg-orange
  .container
    .navbar-brand
      a.navbar-brand(href='#') Muimui UI

#app.mt-3.container
  .row
    demo-list.col-sm-2
    router-view.col-sm-10
</template>

<script lang="ts" setup>
import DemoList from './demo.vue';
//import Manager from '@/mixins/modal';
</script>
