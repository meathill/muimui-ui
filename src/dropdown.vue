<template lang="pug">
.nav-item.dropdown(
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

<script>
export default {
  name: 'MuimuiUiDropdown',
  props: {
    tagName: {
      type: String,
      default: 'div',
    },
    align: {
      type: String,
      default: 'left',
    },
    to: {
      type: Object,
      default: null,
    },
    label: {
      type: String,
      default: 'Dropdown',
    },
  },

  data() {
    return {
      show: false,
    };
  },

  beforeMount() {
    document.body.addEventListener('click', this.onBodyClick);
  },
  beforeUnmount() {
    document.body.removeEventListener('click', this.onBodyClick);
  },

  methods: {
    toggle() {
      this.show = !this.show;
    },
    onBodyClick({target}) {
      if (!this.$el.contains(target)) {
        this.show = false;
      }
    },
  },
};
</script>
