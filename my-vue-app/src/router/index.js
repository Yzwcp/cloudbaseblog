import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import index from '@/views/admin/index.vue'
import ArticleList from "@/views/admin/ArticleList/ArticleList.vue";
import Publish from "@/views/admin/Publish/Publish.vue";
import Categorize from "@/views/admin/Categorize/Categorize.vue";
import Tags from "@/views/admin/Tags/Tags.vue";
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
      },{
        path: '/admin/Publish',
        name: 'adminPublish',
        component: Publish,
        meta:{admin:true,title:"发布",route:'/admin/publish'},
      },{
        path: '/admin/Categorize',
        name: 'adminCategorize',
        component: Categorize,
        meta:{admin:true,title:"分类",route:'/admin/Categorize'},
      },{
        path: '/admin/Tags',
        name: 'Tags',
        component: Tags,
        meta:{admin:true,title:"标签",route:'/admin/Tags'},
      }
    ]
  },



]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
