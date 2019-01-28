<template lang="pug">
nav#navbar.navbar.navbar-extend-lg.navbar-dark.bg-orange
  .container
    .navbar-brand
      a.navbar-brand(href='#') Muimui UI
        small.text-muted.ms-2 v{{version}}

#app.mt-3.container
  .row
    demo-list.col-sm-2
    router-view.col-sm-10
</template>

<script lang="ts" setup>
import pkg from '../../package.json';
import DemoList from './demo.vue';
//import Manager from '@/mixins/modal';

const {version} = pkg;
</script>
