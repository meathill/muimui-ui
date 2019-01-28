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
      .loading.ms-3.pb-2(v-if="isLoading")
        span.spinner-border.spinner-border-sm

    slot(name="buttons")

    slot

  alert(:message="message", :status="status", :auto-hide="autoHide")
</template>

<script lang="ts">
export default {
  name: 'MuimuiUiPageHeader',
};
</script>

<script lang="ts" setup>
import {
  ref,
  onBeforeMount,
  toRefs,
  watchEffect,
} from 'vue';
import Alert from '@/alert.vue';
import TextEditor from '@/text-editor.vue';

interface HistoryItem {
  name: string;
  label: string;
  params: object;
  current: boolean;
}

interface Props {
  history: HistoryItem[];
  isLoading?: boolean;
  status?: Nullable<boolean>;
  message?: Nullable<string>;
  title?: string;
  autoHide?: number;
  titleTag?: string;
  isTitleEditor?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  title: 'Title',
  autoHide: 0,
  titleTag: 'h1',
  isTitleEditor: false,
  status: null,
  message: null,
});
const emit = defineEmits<{
  (e: 'title-change', title: string): void;
}>();
const localTitle = ref<string>('');

const {
  history,
  isLoading,
  status,
  message,
  title,
  autoHide,
  titleTag,
  isTitleEditor
} = toRefs(props);

watchEffect(() => {
  localTitle.value = title.value;
});

function onTitleChange() {
  emit('title-change', localTitle.value);
}

onBeforeMount(() => {
  localTitle.value = title.value;
});
</script>
