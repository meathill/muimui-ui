import {createApp} from 'vue';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styl/index.styl';
import router from './router';

const app = createApp({
  ...App,
});
app.use(router);
app.mount('#app');
