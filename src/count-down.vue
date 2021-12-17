<template lang="pug">
component(:is="tagName").cound-down {{message}}
  | {{formatted}}
</template>

<script lang="ts">
export default {
  name: 'MuimuiUiCountDown',
}
</script>

<script lang="ts" setup>
import {
  ref,
  computed,
  onBeforeMount,
  onBeforeUnmount,
  toRefs,
} from 'vue';

interface Props {
  tagName: string;
  duration: number;
  message: string;
  countDownText: string;
}

const props = withDefaults(defineProps<Props>(), {
  tagName: 'div',
  duration: 6,
  message: '',
  countDownText: '将于 %s 秒后跳转。',
});
const emit = defineEmits<{
  (e: 'over'):void
}>();
const {
  tagName,
  duration,
  message,
  countDownText,
} = toRefs(props);

const left = ref<number>(0);
const formatted = computed(() => {
  return countDownText.value.replace('%s', left.value.toString());
});

type timer = ReturnType<typeof setInterval>;
let interval!:timer;
function countDown() {
  if (left.value > 0) {
    left.value -= 1;
    return;
  }
  clearInterval(interval);
  emit('over');
}

onBeforeMount(() => {
  left.value = duration.value;
  interval = setInterval(countDown, 1000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>
