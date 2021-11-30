<template lang="pug">
.modal-dialog(role="document", :class="{'modal-lg': size === 'lg', 'modal-sm': size === 'sm'}")
  .modal-content
    .modal-header
      h5.modal-title {{title}}
      button.close(type="button", @click.stop="doClose") &times;
    .modal-body
      slot
    .modal-footer.flex-wrap.justify-content-between(v-if="hasFooter")
      alert.w-100.mr-0(:message="message", :status="status")

      button.btn.btn-link(
        v-if="cancelText",
        type="button",
        @click="doClose",
      )
        i.fas.fa-times.mr-2
        | {{cancelText}}

      button.btn.btn-primary(
        v-if="formId",
        :form="formId",
        :disabled="isSaving",
      )
        span.spinner-border.spinner-border-sm.mr-2(v-if="isSaving")
        i.fas.fa-check.mr-2(v-else)
        | {{confirmText}}
      button.btn.btn-primary(
        v-else-if="confirmText",
        @click="doConfirm",
      )
        i.fas.fa-check.mr-2
        | {{confirmText}}
</template>

<script>
import Alert from '@/alert';

export default {
  components: {Alert},

  props: {
    title: {
      type: String,
      default: 'Modal',
    },
    content: {
      type: String,
      default: null,
    },
    hasFooter: {
      type: Boolean,
      default: true,
    },
    confirmText: {
      type: String,
      default: 'Submit',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    size: {
      type: String,
      default: '',
    },
    formId: {
      type: String,
      default: null,
    },
    status: {
      type: Boolean,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
    isSaving: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['confirm', 'close'],
  methods: {
    doConfirm() {
      this.$emit('confirm');
    },
    doClose() {
      this.$emit('close', this);
    },
  },
};
</script>
