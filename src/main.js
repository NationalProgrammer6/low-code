

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Empty from '@/components/Empty.vue';

import App from './App.vue'
import router from './router'

import '@/style/index.scss'
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)

app.component('Empty', Empty);

import { initMaterials } from './material/registerMaterials';
initMaterials(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
