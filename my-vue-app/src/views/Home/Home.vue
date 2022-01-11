<template>
 <div class="home">
  <div class="banner"></div>
  <div class="article">
   <div class="article-filter">
     <ArticleFilter/>
   </div>
   <div class="article-ArticleList">
      <ArticleList />
    
      <!-- <router-view/> -->
      <a-pagination  v-model:current="page.current" :total="articleTotal" :pageSize='page.limit' @change='changeCurrent'/>
      <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload"  >
        <a-button>
          <upload-outlined></upload-outlined>
          Select File
        </a-button>
      </a-upload>
      <a-button
        type="primary"
        :disabled="fileList.length === 0"
        :loading="uploading"
        style="margin-top: 16px"
        @click="handleUpload"
      >
        {{ uploading ? 'Uploading' : 'Start Upload' }}
      </a-button>
      <img :src="allData.url" alt="">
   </div>
   <div class="article-Overview">
    <Overview/>
   </div>
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


import {HOME_LIMIT as limit} from '@/util/config.js'
export default defineComponent({
  name: 'Home',
  props: {
    id:[Number],
  },
  components: {
   ArticleList,Overview,UploadOutlined,ArticleFilter
  },
  setup(props){
    const handleRemove = file => {
      const index = fileList.value.indexOf(file);
      const newFileList = fileList.value.slice();
      newFileList.splice(index, 1);
      fileList.value = newFileList;
    };
    const beforeUpload = file => {
      fileList.value = [...fileList.value, file];
      return false;
    };
    const {proxy} = getCurrentInstance()
    const fileList = ref([]);
    const uploading = ref(false);
    const router = useRouter()
    let articleTotal = ref(0)
    let page = reactive({
      current:+props.id,
      skip:0,
      limit:limit
    })
    //  {skip:(current.value-1)*limit,limit}
    let allData = reactive({dataSource:[],url:'',tagList:[],categorizeTotal:0,categorizeList:[],categorizeItem:{}})
    //获取分类
    proxy.$api.getList('categorize').then(res=>{
      allData.categorizeTotal = res.data.length
      allData.categorizeList = res.data
    })
    //获取文章总数
    proxy.$api.getCount('article').then(res=>{
      console.log(res);
      articleTotal.value = res.total
    })
    //获取tags
    proxy.$api.getList('classify').then(res=>{  

      allData.tagList= [...res.data[0].tags]
    })
    //文章列表
    const initArticleList = async ()=>{
      let where = allData.categorizeItem.title
      if(Object.keys(allData.categorizeItem).length==0) where = {}
      const {data} = await proxy.$api.getList('article',
      page,
      where
      )
      allData.dataSource = data 
    }
    //页码修改
    const changeCurrent = (v) =>{
      page.current =v
      page.skip =  (v-1)*limit
      router.push({name:'Home',params:{id:v}})
      initArticleList()
    }
    //上传文件
    const handleUpload = () => {
      uploading.value = true; // You can use any AJAX library you like
      proxy.$api.uploadOss(fileList.value[0],fileList.value[0].name).then(res=>{
        console.log(res);
        allData.url = res
      })
    };
    const categorizeHandle = (item) =>{
      
      allData.categorizeItem = {...item}
      initArticleList()
    }

  
    initArticleList()
    provide('allData', allData)
    provide('categorizeHandle', categorizeHandle)
    return{
      allData,
      changeCurrent,
      articleTotal,
      page,
      fileList,
      uploading,
      handleRemove,
      beforeUpload,
      handleUpload,
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
  .article{
    display: flex;
  }
  .article-filter{
    flex: .5;
  }
 .article-ArticleList{
   
   flex: 2;
 }
 .article-Overview{
  flex: 1;
 }
</style>