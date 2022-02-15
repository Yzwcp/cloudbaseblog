import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import index from '@/views/admin/index.vue'
import ArticleList from "@/views/admin/ArticleList/ArticleList.vue";
import Publish from "@/views/admin/Publish/Publish.vue";
import Categorize from "@/views/admin/Categorize/Categorize.vue";
import Tags from "@/views/admin/Tags/Tags.vue";
import Login from "@/components/Login/Login.vue";
import ArticleDetail from '@/views/Home/childComps/Article/ArticleDetail.vue'
import thirdParty from "@/views/thirdParty/thirdParty.vue";
import HomeArticleList from "@/views/Home/childComps/Article/ArticleList.vue";

const routes = [
  {
    path: '/',
    redirect:'/index'

  },
  {
    path: '/index',
    name: 'Home',
    component: Home,
    meta:{admin:false,title:'首页',route:'/index',keepAlive:false},
    props:true
  },
  {
    path: '/detail',
    name: 'ArticleDetail',
    component: ArticleDetail,
    meta:{admin:false,title:'文章详情',route:'/detail'},
  },

  {
    path: '/admin',
    name: 'admin',
    component: index,
    meta:{admin:true,title:'首页',route:'/admin',keepAlive:false},
    children:[
      {
        path: '/admin/article',
        name: 'adminArticle',
        component: ArticleList,
        meta:{admin:true,title:"文章",route:'/admin/article',props:true,keepAlive:false},
      },{
        path: '/admin/Publish',
        name: 'adminPublish',
        component: Publish,
        meta:{admin:true,title:"发布",route:'/admin/publish',keepAlive:false},
      },{
        path: '/admin/Categorize',
        name: 'adminCategorize',
        component: Categorize,
        meta:{admin:true,title:"分类",route:'/admin/Categorize',keepAlive:false},
      },{
        path: '/admin/Tags',
        name: 'Tags',
        component: Tags,
        meta:{admin:true,title:"标签",route:'/admin/Tags',keepAlive:false},
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{admin:true,title:'登录',route:'/login'},

  },
  {
    path: '/thirdParty',
    name: 'thirdParty',
    component: thirdParty,
    meta:{admin:false,title:'资源',route:'/thirdParty'},
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
