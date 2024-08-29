import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import App from './App.vue';
import router from './router';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
const pinia = createPinia();
app.use(createPinia());
app.use(router);
app.use(VueSweetalert2);
app.use(pinia);
app.use(Toast, {
  position: POSITION.TOP_CENTER
});
app.mount('#app');
