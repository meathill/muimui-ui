<template lang="pug">
.alert-container
  transition(
    name="slide-down",
    enter-active-class="animated slideInDown",
    leave-active-class="animated slideOutUp",
  )
    .alert.alert-dismissible(:class="status ? 'alert-success' : 'alert-danger'", v-if="visible && message")
      | {{message}}

      slot

      button.btn-close(
        type="button",
        aria-label="Close",
        @click="doDismiss",
      )
</template>

<script lang="ts">
export default {
  name: 'MuimuiUiAlert',
}
</script>

<script lang="ts" setup>
import {
  ref,
  computed,
  watch,
  getCurrentInstance,
  defineComponent,
  toRefs,
} from 'vue';

interface Props {
  message: Nullable<string>;
  status: Nullable<boolean>;
  autoHide: number;
}

const props = withDefaults(defineProps<Props>(), {
  message: null,
  status: null,
  autoHide: 0,
});

const emit = defineEmits<{
  (e: 'hide', instance: ReturnType<typeof defineComponent>): void
}>();

const {
  message,
  status,
  autoHide,
} = toRefs(props);
const visible = ref(true);

const timeoutDuration = computed(() => {
  return Number(autoHide.value);
});

type timer = ReturnType<typeof setTimeout>;
let timeout!:timer;
watch(message, (value) => {
  clearTimeout(timeout);
  if (value) {
    visible.value = true;
    if (timeoutDuration.value && status.value) {
      timeout = setTimeout(() => {
        let instance = getCurrentInstance();
        visible.value = false;
        emit('hide', instance);
      }, timeoutDuration.value);
    }
  }
});

function doDismiss() {
  visible.value = false;
  clearTimeout(timeout);
}
</script>
