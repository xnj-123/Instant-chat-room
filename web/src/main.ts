import { createApp } from 'vue'
import store from '@/stores'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import '@/styles/reset.scss'

import globalcomponents from '@/components/index'


const app = createApp(App)

app.use(store)
app.use(router)

import './permission'


app.use(ElementPlus, {
    locale: zhCn
})

app.use(globalcomponents)

app.mount('#app')
