import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import './index.less'
import 'ant-design-vue/dist/antd.less';
import "vditor/dist/index.css";
createApp(App).use(router).use(Antd).mount('#app')
