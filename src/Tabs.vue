<template lang="pug">
.tabs(tabs)
  ul.nav(:class="navStyleClass", role="tablist")
    li.nav-item(
      v-for="(header, i) in headers",
      :class="{disabled:header.disabled}",
    )
      slot(name="header")
        a.nav-link(
          href="#",
          v-html="header.header",
          :class="{active: index === i}",
          @click.prevent="doSelect(header)",
        )

  .tab-content
    slot

  slot(name="addon")
</template>

<script>
export default {
  name: 'BluebirdUITabs',
  props: {
    // effect: {type: String, default: 'fadein'},
    justified: {
      type: Boolean,
      default: false,
    },
    navStyle: {type: String, default: null},
    activeTab: {type: Number, default: 0},
  },
  computed: {
    navStyleClass() {
      return [
        ~['pills', 'stacked'].indexOf(this.navStyle) ? 'nav-' + this.navStyle : 'nav-tabs',
        {
          'nav-justified': this.justified,
          'nav-pills': this.navStyle === 'stacked',
        },
      ];
    },
    show() {
      return this.tabs[this.index] || this.tabs[0];
    },
  },
  data() {
    const index = this.activeTab || 0;
    return {
      index,
      headers: [],
      tabs: [],
    };
  },
  watch: {
    index(val) {
      this.$emit('active', val);
      this.$emit('input', val);
    },
    activeTab(val) {
      this.index = val;
    },
  },
  methods: {
    doSelect(tab) {
      if (!tab.disabled) {
        this.index = this.tabs.indexOf(tab);
      }
    },
  },
  created() {
    this._isTabs = true;
  },
};
</script>
