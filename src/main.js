

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initMaterials } from './material/registerMaterials';
import { initSetters } from '@/components/setters'

import Empty from '@/components/Empty.vue';
import App from './App.vue'
import router from './router'

import '@/style/index.scss'
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)

app.component('Empty', Empty);
// 注册物料(拖拽到页面的组件)
initMaterials(app)
// 注册设置器
initSetters(app)


app.use(createPinia())
app.use(router)

app.mount('#app')
