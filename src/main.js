import { createApp } from 'vue'
import App from './App.vue'

import pinia from '@/stores'
import router from '@/router'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import '@/assets/styles/index.scss'
import 'element-plus/dist/index.css'

import '@/router/permission'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
