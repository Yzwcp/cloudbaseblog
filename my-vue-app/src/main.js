import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd, { message } from 'ant-design-vue';
import './index.less'
import "vditor/dist/index.css"
import 'ant-design-vue/dist/antd.less';
import { API, } from '@/util/api.js'
import store from './store'
// import '@/util/md5.js'
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('UMEP_BLOG')
    console.log(token)
    if (to.meta.admin && !to.path.includes('login')) {
        if (token) return next()
        message.info('请登录')
        next({ path: '/login' })
    } else {
        next()
    }
})

const app = createApp(App).use(store)
app.config.globalProperties.$api = API;
app.config.globalProperties.$message = message;
app.use(router).use(Antd).mount('#app')