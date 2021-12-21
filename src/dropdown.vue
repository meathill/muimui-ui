<template lang="pug">
.nav-item.dropdown(
  ref="$el",
  :class="{show: show}",
  :is="tagName",
)
  router-link.nav-link.dropdown-toggle(
    v-if="to",
    :to="to",
    role="button",
    aria-haspopup="show",
    @click.native="toggle",
  )
    slot(name="title") {{label}}
  a.nav-link.dropdown-toggle(
    v-else,
    href="#",
    role="button",
    aria-haspopup="true",
    :aria-expanded="show",
    @click.prevent="toggle",
  )
    slot(name="title") {{label}}
  .dropdown-menu(
    :class="{show: show, ['dropdown-menu-' + align]: true}",
    @click="show = false",
  )
    slot
</template>

<script lang="ts">
export default {
  name: 'MuimuiUiDropdown',
}
</script>

<script lang="ts" setup>
import {onBeforeMount, onBeforeUnmount, ref, toRefs} from "vue";

interface Props {
  tagName: string;
  align: string;
  to?: object;
  label: string;
}

const props = withDefaults(defineProps<Props>(), {
  tagName: 'div',
  align: 'left',
  label: 'Dropdown',
});
const {
  tagName,
  align,
  label,
  to,
} = toRefs(props);
const show = ref<boolean>(false);
const $el = ref<HTMLDivElement>();

function toggle() {
  show.value = !show.value;
}
function onBodyClick(event: MouseEvent) {
  const target = event.target as Element;
  if (!$el.value?.contains(target)) {
    show.value = false;
  }
}

onBeforeMount(() => {
  document.body.addEventListener('click', onBodyClick);
});
onBeforeUnmount(() => {
  document.body.removeEventListener('click', onBodyClick);
});
</script>
