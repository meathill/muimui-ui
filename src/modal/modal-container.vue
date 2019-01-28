<template lang="pug">
.modal-container
  .modal.fade(
    ref="container",
    v-if="modals.length",
    :class="{show: modals.length}",
    :style="modals.length ? 'display: block' : ''",
    @click="closeModal",
  )
    modal-item(
      v-for="(item, index) in modals",
      v-bind="item.props",
      ref="items",
      @close="closeModal(index)",
      @confirm="onModalConfirm(item)",
      :key="index",
    )
      component(
        v-if="item.component",
        :is="item.component",
        v-bind="item.data",
        @confirm="onModalConfirm(item, $event)",
        @close="closeModal(item)",
      )
      template(v-else-if="item.props.content") {{item.props.content}}
  .modal-backdrop.fade(
    v-if="modals.length",
    :class="{show: modals.length}",
  )
</template>

<script>
import ModalItem from './modal-item';

export default {
  components: {
    ModalItem,
  },

  data() {
    return {
      modals: [],
    };
  },

  methods: {
    doCancel(index, cancel) {
      this.modals.splice(index, 1);
      if (!cancel) {
        return;
      }
      const [promise] = this.promises.splice(index, 1);
      promise.reject('cancel');
    },
    doConfirm(index, data) {
      const modal = this.modals[index];
      const [promise] = this.promises.splice(index, 1);
      if (data) {
        promise.resolve({data, modal});
      } else {
        promise.resolve(modal);
      }
      if (modal) {
        const {closeOnConfirm} = modal;
        if (closeOnConfirm) {
          this.modals.splice(index, 1);
        }
      }
    },
    showModal(modal) {
      return new Promise((resolve, reject) => {
        this.modals.push(modal);
        this.promises.push({resolve, reject});
      });
    },
    closeModal(index, cancel) {
      if (index instanceof Event) {
        const notBackdrop = !this.$refs.container || index.target !== this.$refs.container;
        const disabledBackdrop = !this.modals[this.modals.length - 1]
          || !this.modals[this.modals.length - 1].backdrop;
        if (notBackdrop || disabledBackdrop) {
          return;
        }
      }
      if (index === undefined || index.target === this.$refs.container) {
        index = this.modals.length - 1;
      } else if (isNaN(index)) {
        index = this.modals.indexOf(index);
        if (index === -1) {
          return;
        }
      }
      this.doCancel(index, cancel);
    },
    onModalConfirm(item, data) {
      const index = this.modals.indexOf(item);
      item.confirm && item.confirm(item, data);
      this.doConfirm(index, data);
    },
    onEsc({key}) {
      if (key !== 'Escape') {
        return;
      }
      const modal = this.modals[this.modals.length - 1];
      if (modal.esc === false) {
        return;
      }
      this.closeModal();
    },
  },

  created() {
    this.promises = [];
  },
  mounted() {
    document.body.addEventListener('keyup', this.onEsc);
  },
  beforeUnmount() {
    document.body.removeEventListener('keyup', this.onEsc);
  },
};
</script>
