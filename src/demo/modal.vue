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

  button.btn.btn-primary.ms-3(
    type="button",
    @click="doOpenNoFooterModal",
  ) Open no footer Modal

  button.btn.btn-primary.ms-3(
    type="button",
    @click="doOpenComponentModal",
  ) Open Component Modal

  button.btn.btn-primary.ms-3(
    type="button",
    @click="doOpenAutoCloseComponentModal",
  ) Open Auto-close Form Modal

  .action-bar.mt-3
    .form-group.form-inline
      label.col-form-label(for="toggle-backdrop") Backdrop
      .pt-1.ms-2
        toggle#backdrop(
          v-model="backdrop",
        )

  hr
  p value: {{value}}
</template>

<script lang="ts">
export default {
  name: 'ModalDemo',
}
</script>

<script lang="ts" setup>
import {history} from "@/demo/router";
import Toggle from '@/Toggle.vue';
import InputForm from './input-form.vue';
import {sleep} from '@/helper';
import {getCurrentInstance, ref} from "vue";

const value = ref();
const backdrop = ref<boolean>(true);

async function doOpenModal() {
  try {
    const instance = getCurrentInstance();
    $root.showModal({
      title: 'hello',
      content: 'world',
      backdrop,
    });
  } catch (e) {
    console.log(e);
  }
}

async function doOpenComponentModal() {
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
}

async function doOpenNoFooterModal() {
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
}

async function doOpenAutoCloseComponentModal() {
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
}
</script>
