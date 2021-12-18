<template lang="pug">
button.btn.spin-button(
  :type="type",
  :disabled="status",
)
  span.spinner-border.spinner-border-sm.me-2(v-if="status")
  slot(name="icon")
    i.me-2(
      v-if="icon && !status",
      :class="icon",
    )
  slot {{label}}
</template>

<script lang="ts">
export default {
  name: 'MuimuiUiSpinButton',
}
</script>

<script lang="ts" setup>
import {toRefs} from "vue";

interface Props {
  type: string;
  icon?: string;
  status: boolean;
  label: string;
}

const props = withDefaults(defineProps<Props>(),  {
  type: 'button',
  status: false,
  label: 'Button',
});
const {
  type,
  icon,
  status,
  label,
} = toRefs(props);
</script>
