import {h} from 'vue';
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouterView,
} from 'vue-router';
import PageHeader from '@/demo/page-header.vue';
import Toggle from '@/demo/toggle.vue';
import Alert from '@/demo/alert.vue';
import SearchField from '@/demo/search-field.vue';
import Dropdown from '@/demo/dropdown.vue';
/*
import Modal from '@/demo/modal';*/
import DateTimePicker from '@/demo/date-time-picker.vue';
import Pagination from '@/demo/Pagination.vue';
import SpinButton from '@/demo/spin-button.vue';

interface Route {
  path: string;
  name: string;
  component: any;
  title: string;
}

export const history = [
  {
    label: 'All Components',
    name: 'home',
  },
];

export const components = [
  {
    path: 'page-header',
    name: 'page-header',
    component: PageHeader,
    title: 'Page Header',
  },
  {
    path: 'toggle',
    name: 'toggle',
    component: Toggle,
    title: 'Toggle',
  },
  {
    path: 'alert',
    name: 'alert',
    component: Alert,
    title: 'Alert',
  },
  {
    path: 'search-field',
    name: 'search-field',
    component: SearchField,
    title: 'Search Field',
  },
  {
    path: 'dropdown',
    name: 'dropdown',
    component: Dropdown,
    title: 'Dropdown',
  },
  /*{
    path: 'modal',
    name: 'modal',
    component: Modal,
    title: 'Modal',
  },*/
  {
    path: 'date-time-picker',
    name: 'data-time-picker',
    component: DateTimePicker,
    title: 'Date Time Picker',
  },
  {
    path: 'pagination',
    name: 'pagination',
    component: Pagination,
    title: 'Pagination',
  },
  {
    path: 'spin-button',
    name: 'spin-button',
    component: SpinButton,
    title: 'Spin Button',
  },
];

export const routes = [
  {
    path: '/',
    name: 'home',
    component: {
      render() {
        return h(RouterView);
      },
    },
    children: components,
  },
];

const router = createRouter({
  history: process.env.NODE_ENV === 'production'
    ? createWebHistory()
    : createWebHashHistory(),
  scrollBehavior: (to) => {
    if (to.hash && !/^#/.test(to.hash)) {
      return {selector: to.hash};
    }
    return {top: 0};
  },
  routes,
  linkActiveClass: 'active',
});

export default router;
