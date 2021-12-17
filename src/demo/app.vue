<template lang="pug">
nav#navbar.navbar.navbar-extend-lg.navbar-dark.bg-primary
  .container
    .navbar-brand
      a.navbar-brand(href='#') Muimui UI

#app.row
  //demo-list.col-sm-2
  router-view.col-sm-10

text-editor(v-model="message")
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import TextEditor from '@/text-editor.vue';
//import demoList from './demo.vue';
//import Manager from '@/mixins/modal';

const message = ref('hello world')
</script>
