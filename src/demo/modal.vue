<template lang="pug">
.modal-demo
  page-header(
    :history="history",
    title="Toggle",
  )

  button.btn.btn-primary(
    type="button",
    @click="doOpenModal",
  ) Open Modal

  button.btn.btn-primary.ml-3(
    type="button",
    @click="doOpenNoFooterModal",
  ) Open no footer Modal

  button.btn.btn-primary.ml-3(
    type="button",
    @click="doOpenComponentModal",
  ) Open Component Modal

  button.btn.btn-primary.ml-3(
    type="button",
    @click="doOpenAutoCloseComponentModal",
  ) Open Auto-close Form Modal

  .action-bar.mt-3
    .form-group.form-inline
      label.col-form-label(for="toggle-backdrop") Backdrop
      .pt-1.ml-2
        toggle#backdrop(
          v-model="backdrop",
        )

  hr
  p value: {{value}}
</template>

<script>
import component from '@/demo/component';
import Toggle from '@/Toggle';
import InputForm from './input-form';
import {sleep} from '@/helper';

export default {
  components: {
    Toggle,
  },
  mixins: [component],

  data() {
    return {
      value: null,
      backdrop: true,
    };
  },

  methods: {
    async doOpenModal() {
      const {backdrop} = this;
      try {
        this.$root.showModal({
          title: 'hello',
          content: 'world',
          backdrop,
        });
      } catch (e) {
        console.log(e);
      }
    },

    async doOpenComponentModal() {
      const {backdrop} = this;
      let modal, months;
      try {
        modal = this.$root.showModal({
          title: 'hello',
          formId: 'trial',
          component: InputForm,
          data: this.value,
          backdrop,
        });
        ({modal, data: months} = await modal);
      } catch (e) {
        return;
      }
      modal.props.isSaving = true;
      this.value = months;
      await sleep();
      modal.props.isSaving = false;
      modal.props.status = true;
      modal.props.message = 'Saved.';
      setTimeout(() => {
        this.closeModal(modal, false);
      }, 1000);
    },

    async doOpenNoFooterModal() {
      const {backdrop} = this;
      try {
        await this.$root.showModal({
          title: 'No footer',
          content: 'I have no footer',
          hasFooter: false,
          backdrop,
        });
      } catch (e) {
        console.log(e);
      }
    },

    async doOpenAutoCloseComponentModal() {
      const {backdrop} = this;
      let modal, months;
      try {
        modal = this.$root.showModal({
          title: 'hello',
          formId: 'trial',
          component: InputForm,
          data: this.value,
          closeOnConfirm: true,
          backdrop,
        });
        ({modal, data: months} = await modal);
      } catch (e) {
        return;
      }
      this.value = months;
    },
  },
};
</script>
