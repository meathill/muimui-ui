<template lang="pug">
header.or-page-header
  .page-header
    nav(v-if="history", aria-label="breadcrumb")
      ol.breadcrumb
        router-link.breadcrumb-item(
          v-for="item in history",
          tag="li",
          active-class="active",
          :key="item.name",
          :aria-current="item.current ? 'page' : false",
          :to="{name: item.name, params: item.params}",
        )
          template(v-if="item.current") {{item.label}}
          a(
            v-else,
            href="#",
          ) {{item.label}}
      span /

    slot(name="title")
      text-editor.my-0(
        :tag-name="titleTag",
        v-if="isTitleEditor",
        v-model="localTitle",
        @input="onTitleChange",
      )
      component.my-0(
        v-else,
        :is="titleTag",
      ) {{title}}

    slot(name="loading")
      .loading.ml-3.pb-2(v-if="isLoading")
        span.spinner-border.spinner-border-sm

    slot(name="buttons")

    slot

  alert(:message="message", :status="status", :auto-hide="autoHide")
</template>

<script>
import Alert from './alert';
import TextEditor from './text-editor';

export default {
  name: 'BluebirdUIPageHeader',
  components: {TextEditor, Alert},
  props: {
    history: {
      type: Array,
      default: null,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
    autoHide: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: 'Title',
    },
    titleTag: {
      type: String,
      default: 'h1',
    },
    isTitleEditor: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localTitle: '',
    };
  },

  watch: {
    title(value) {
      this.localTitle = value;
    },
  },

  methods: {
    onTitleChange() {
      this.$emit('title-change', this.localTitle);
    },
  },

  beforeMount() {
    this.localTitle = this.title;
  },
};
</script>
