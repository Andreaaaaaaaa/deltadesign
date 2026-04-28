import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import App from './App.vue';

// import './index.css'

const app = createApp(App);
// app.use(router);
app.use(TDesign);
app.mount('#app');
