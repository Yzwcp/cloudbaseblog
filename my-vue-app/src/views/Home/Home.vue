<template>
 <div class="home">
  <div class="banner"></div>
  <div class="article" >
   <a-row class="article-filter" type="flex" justify="center" >
     <a-col :span="3">
       <ArticleFilter ref="classifyRef"/>
     </a-col>
     <a-col :span="10" style="margin:0 30px">
       <ArticleList />
       <a-pagination  v-model:current="page.current" :total="page.total" :pageSize='page.pageSize' @change='changeCurrent'/>
     </a-col>
     <a-col :span="5">
       <Overview/>
     </a-col>
   </a-row>
  </div>
 </div>
</template>

<script>
import ArticleList from "@/views/Home/childComps/Article/ArticleList.vue";
import Overview from "@/views/Home/childComps/Overview/Overview.vue";
import ArticleFilter from './childComps/ArticleFilter/ArticleFilter.vue'
import {defineComponent, reactive, toRefs,getCurrentInstance,provide,ref} from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue';
import {useRouter} from 'vue-router'
import {HOME_LIMIT} from '@/util/config.js'
export default defineComponent({
  name: 'Home',
  props: {
    id:[Number],
  },
  components: {
   ArticleList,Overview,UploadOutlined,ArticleFilter
  },
  setup(props){
    const {proxy} = getCurrentInstance()
    const classifyRef = ref('')

    /**
     *分页
     */
    const page = reactive({
      current:1,//当前页
      // pageNum:`1,${HOME_LIMIT}`,
      pageSize:HOME_LIMIT,//显示多少条默认5
      total:0
    })
    /**
     * 查询条件
     */
    let condition = reactive({
      orderBy:'id,DESC',
    })
    /**
     *清除查询条件
     */
    const clearCondition  = () => {
      page.current = 1
      // page.limit = `1,${HOME_LIMIT}`
      // page.where = ''
      page.pageSize = HOME_LIMIT
      condition = {
        orderBy:'id,DESC',
      }
    }
    const initData = reactive({
      articleList:[],
      classifyList:[],
      tagsList:[],
      articleTotal:0,
      classifyTotal:0,
      tagsTotal:0,
    })
    /**
     * 获取文章
     */
    const getArticle  = async () => {
      const { result , success ,message ,total} = await proxy.$api.getQueryAPI('article',{
        ...page,
        ...condition
      })
      if(success){
        console.log(result);
        initData.articleList = result.rows
        page.total = result.count
        initData.articleTotal = result.count
      }
    }
    /**
     * 获取文章分类列表
     * @returns {Promise<void>}
     */
    const getClassify  = async () => {
      const {result=[],success,total=0} = await proxy.$api.getQueryAPI('categorize')
      if (success){
        initData.classifyList = [...result.rows]
        initData.classifyTotal =  result.count
      }
    }
    /**
     * 获取标签列表
     * @returns {Promise<void>}
     */
    const getTags  = async () => {
      const {result=[],success,total=0} = await proxy.$api.getQueryAPI('tags')
      if (success){
        initData.tagsList = [...result.rows]
        initData.tagsTotal = result.count
      }
    }
    /**
     * 筛选标签
     * @param v
     * @returns {Promise<void>}
     */
    const tagsHandle  = async (v) => {
      clearCondition()
      classifyRef.value.selectData = {}//清除分类筛选的样式
      condition.tags = v
      getArticle()
    }
    /**
     * 筛选分类
     * @param v
     * @returns {Promise<void>}
     */
    const classifyHandle  = async (v) => {
      clearCondition()
      condition.categorize = v
      getArticle()
    }
    //页码修改
    const changeCurrent = (v) =>{
      page.current = v
      // page.limit  = (v-1)*page.pageSize+','+page.pageSize
      getArticle()
      // router.push({name:'Home',params:{id:v}})
      // initData() 1 5    6 10  11 15
    }
    const initFn  = () => {
      getArticle()
      getTags()
      getClassify()
    }
    initFn()


    provide('initData', initData)
    provide('categorizeHandle', classifyHandle)
    provide('tagsHandle', tagsHandle)
    return{
      ...toRefs(initData),
      changeCurrent,
      page,
      classifyRef,
    }
  },
  created(){
  },
  activated(){
  },

})
</script>

<style scoped >
  .home{
    padding: 50px 0;
  }
 /* .article{*/
 /*   display: flex;*/
 /* }*/
 /* .article-filter{*/
 /*   flex: .5;*/
 /* }*/
 /*.article-ArticleList{*/
 /*  padding: 20px;*/
 /*  flex: 3;*/
 /*}*/
 /*.article-Overview{*/
 /* flex: 1;*/
 /*}*/
</style>
