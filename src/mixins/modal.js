import {createApp, markRaw} from 'vue';
import Container from '../modal/modal-container';

export default {
  methods: {
    showModal(modal) {
      let {
        title,
        content,
        size,
        formId,
        component = null,
        data = null,
        confirmText = undefined,
        cancelText = undefined,
        hasFooter = true,
        closeOnConfirm = null,
        backdrop = true,
      } = modal;
      if (component) {
        component = markRaw(component);
      }
      if (!formId && closeOnConfirm === null) {
        closeOnConfirm = true;
      }
      modal = {
        props: {
          title,
          content,
          size,
          formId,
          confirmText,
          cancelText,
          hasFooter,
          status: null,
          message: null,
          isSaving: false,
        },
        component,
        message: null,
        status: null,
        data: {
          formId,
          addon: data,
        },
        closeOnConfirm,
        backdrop,
      };
      return this.$modalManager.showModal(modal);
    },
    closeModal(index, cancel = true) {
      this.$modalManager.closeModal(index, cancel);
    },
  },

  mounted() {
    const {$store, $router} = this;
    const $modalManger = createApp({
      ...Container,
    });
    if ($router) {
      $modalManger.use($router);
    }
    if ($store) {
      $modalManger.use($store);
    }
    const el = document.createElement('div');
    this.$el.appendChild(el);
    this.$modalManager = $modalManger.mount(el);
  },
};
