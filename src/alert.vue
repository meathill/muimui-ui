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

      button.close(type="button", @click="doDismiss") &times;
</template>

<script>
export default {
  name: 'BluebirdUIAlert',
  props: {
    message: {
      type: String,
      default: null,
    },
    status: {
      type: Boolean,
      default: null,
    },
    autoHide: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    timeoutDuration() {
      return Number(this.autoHide);
    },
  },

  data() {
    return {
      visible: true,
    };
  },

  watch: {
    message(value) {
      clearTimeout(this.timeout);
      if (value) {
        this.visible = true;
        if (this.timeoutDuration && this.status) {
          this.timeout = setTimeout(() => {
            this.visible = false;
            this.$emit('hide', this);
          }, this.timeoutDuration);
        }
      }
    },
  },

  methods: {
    doDismiss() {
      this.visible = false;
      clearTimeout(this.timeout);
    },
  },
};
</script>
