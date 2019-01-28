<template lang="pug">
.tab-pane(
  ref="panel"
  role="tabpanel",
  :class="{'active fade':active, 'show':fadein}",
)
  slot
</template>

<script>
export default {
  name: 'MuimuiUiTab',
  props: {
    disabled: {type: Boolean, default: false},
    header: {type: String, default: null},
  },
  data() {
    return {
      fadein: false,
    };
  },
  computed: {
    active() {
      var active = !this._tabs || this._tabs.show === this;
      this.fadein = false; // eslint-disable-line vue/no-side-effects-in-computed-properties
      if (active) {
        setTimeout(() => { // eslint-disable-line vue/no-async-in-computed-properties
          this.fadein = true; // eslint-disable-line vue/no-side-effects-in-computed-properties
        }, 0);
      }
      return active;
    },
    index() {
      return this._tabs.tabs.indexOf(this);
    },
    transition() {
      return this._tabs ? this._tabs.effect : null;
    },
  },
  created() {
    this._isTab = true;
    let tabs = this; // eslint-disable-line @typescript-eslint/no-this-alias
    while (!this._tabs && tabs.$parent) {
      if (tabs._isTabGroup) {
        tabs.tabs.push(this);
        this._tabGroup = tabs;
      }
      if (tabs._isTabs) {
        tabs.tabs.push(this);
        this._tabs = tabs;
        if (!this._tabGroup) tabs.headers.push(this);
      }
      tabs = tabs.$parent;
    }
    if (!this._tabs) throw Error('tab depend on tabs.');
  },
  beforeUnmount() {
    if (this._tabGroup) {
      this._tabGroup.tabs = this._tabGroup.tabs.filter(el => el !== this);
    }
    if (this._tabs) {
      this._tabs.tabs = this._tabs.tabs.filter(el => el !== this);
    }
    if (this._tabs) {
      if (this._tabs.active === this.index) {
        this._tabs.index = 0;
      }
      if (this._ingroup) {
        let id = this.$parent.tabs.indexOf(this);
        if (~id) this.$parent.tabs.splice(id, 1);
      }
    }
    if (this._tabs) {
      let id = this._tabs.tabs.indexOf(this);
      if (~id) this._tabs.tabs.splice(id, 1);
    }
  },
};
</script>
