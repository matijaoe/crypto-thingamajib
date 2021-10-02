import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';
import store from './store';

import 'element-plus/dist/index.css';

import BaseCard from '@/components/UI/BaseCard.vue';
import BaseIcon from '@/components/UI/BaseIcon.vue';

const app = createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus);

app.component('base-card', BaseCard);
app.component('base-icon', BaseIcon);

app.mount('#app');
