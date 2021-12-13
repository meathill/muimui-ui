import {createApp} from 'vue';
import App from './app.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styl/demo.styl';
import '@/styl/index.styl';

const app = createApp(App);
//app.use(router);
app.mount('#app');
