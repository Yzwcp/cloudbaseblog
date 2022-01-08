import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd,{message} from 'ant-design-vue';
import './index.less'

import 'ant-design-vue/dist/antd.less';
import {API,appCloud} from '@/util/api.js'
const app = createApp(App)
app.config.globalProperties.$api = API;
app.config.globalProperties.$message = message;
app.use(router).use(Antd).mount('#app')
