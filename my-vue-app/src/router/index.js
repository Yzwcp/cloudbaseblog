import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import index from '@/views/admin/index.vue'
import ArticleList from "@/views/admin/ArticleList/ArticleList.vue";
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: index,
    meta:{admin:true,title:'首页',route:'/admin'},
    children:[
      {
        path: '/admin/article',
        name: 'adminArticle',
        component: ArticleList,
        meta:{admin:true,title:"文章",route:'/admin/article'},
      }
    ]
  },



]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
