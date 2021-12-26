import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import './index.less'
import 'ant-design-vue/dist/antd.less';
import "vditor/dist/index.css";
import {API,appCloud} from '@/util/api.js'
const app = createApp(App)
app.config.globalProperties.$api = API;
app.config.globalProperties.$app = appCloud;
app.use(router).use(Antd).mount('#app')
