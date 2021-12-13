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
  name: 'BluebirdUIAlert',
}
</script>

<script lang="ts" setup>
import {
  ref,
  computed,
  watch,
  getCurrentInstance,
} from 'vue';

interface Props {
  message: string;
  status: boolean;
  autoHide: number;
}

const props = withDefaults(defineProps<Props>(), {
  autoHide: 0,
});

const emit = defineEmits(['hide']);

const visible = ref(true);

const timeoutDuration = computed(() => {
  return Number(props.autoHide);
});

let timeout:any;
let instance = getCurrentInstance();
watch(() => props.message, (value) => {
  clearTimeout(timeout);
  if (value) {
    visible.value = true;
    if (timeoutDuration.value && props.status) {
      timeout = setTimeout(() => {
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

defineExpose({
  props,

  visible,
});
</script>
