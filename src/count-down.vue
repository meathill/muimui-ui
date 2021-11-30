<template lang="pug">
component(:is="tagName").cound-down {{message}}
  | {{formatted}}
</template>

<script>
export default {
  name: 'BluebirdUICountDown',
  props: {
    tagName: {
      type: String,
      default: 'div',
    },
    duration: {
      type: Number,
      default: 6,
    },
    message: {
      type: String,
      default: '',
    },
    countDownText: {
      type: String,
      default: '将于 %s 秒后跳转。',
    },
  },
  emits: ['over'],

  data() {
    return {
      left: 0,
    };
  },

  computed: {
    formatted() {
      return this.countDownText.replace('%s', this.left);
    },
  },

  beforeMount() {
    this.left = this.duration;
    this.interval = setInterval(this.countDown.bind(this), 1000);
  },

  beforeUnmount() {
    clearInterval(this.interval);
  },

  methods: {
    countDown() {
      if (this.left > 0) {
        this.left -= 1;
        return;
      }
      clearInterval(this.interval);
      this.$emit('over');
    },
  },
};
</script>
