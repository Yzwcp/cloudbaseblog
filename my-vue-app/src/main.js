import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd,{message} from 'ant-design-vue';
import './index.less'
import "vditor/dist/index.css"
import 'ant-design-vue/dist/antd.less';
import {API,appCloud} from '@/util/api.js'
import store from './store'
const app = createApp(App).use(store)
app.config.globalProperties.$api = API;
app.config.globalProperties.$message = message;
app.use(router).use(Antd).mount('#app')
