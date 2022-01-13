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
      <a-pagination  v-model:current="page.current" :total="allData.articleTotal" :pageSize='page.limit' @change='changeCurrent'/>
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
    // 页面分页
    const page = reactive({
      current:1,
      limit:HOME_LIMIT,
      skip:0
    })
    console.log("init")
    //  {skip:(current.value-1)*limit,limit}
    let allData = reactive({dataSource:[],url:'',tagList:[],articleTotal:0,categorizeTotal:0,categorizeList:[],categorizeItem:{}})
    //获取分类
    proxy.$api.getList('categorize').then(res=>{
      allData.categorizeTotal = res.data.length
      allData.categorizeList = res.data
    })
    //获取文章总数
    proxy.$api.getCount('article').then(res=>{
      allData.articleTotal = res.total
    })
    //获取tags
    proxy.$api.getList('classify').then(res=>{  

      allData.tagList= [...res.data[0].tags]
    })
    //文章列表
    const initData = async ()=>{
      allData.dataSource =await filterData()
    }
    //添加筛选参数r
    const filterData = async(where={})=>{
      if(Object.keys(where).length==0) where = {}
      const {data} = await proxy.$api.getList(
          'article',
          {...page},
          {...where}
      )
      return data
    }
    //页码修改
    const changeCurrent = (v) =>{
      page.current = v
      page.skip  =  (v-1)*(page.limit>10?1:page.limit)
      // router.push({name:'Home',params:{id:v}})
      initData()
    }
    //上传文件
    const handleUpload = () => {
      uploading.value = true; // You can use any AJAX library you like
      proxy.$api.uploadOss(fileList.value[0],fileList.value[0].name).then(res=>{
        console.log(res);
        allData.url = res
      })
    };
    //筛选分类
    const categorizeHandle =async (item) =>{
      page.current = 1
      page.skip = 0
      //筛选分类的时候全部展示不要分页了
      page.limit = Object.keys(item).length==0?HOME_LIMIT:999
      if(JSON.stringify(allData.categorizeItem) == JSON.stringify(item)) return
      allData.categorizeItem = {...item}
      allData.dataSource =await filterData({categorize:item.title})
    }
    //筛选标签
    const tagsHandle = async(item)=>{
      const _ = proxy.$api.db.command;
      proxy.$api.db.collection("article")
      .where({
        // gt 方法用于指定一个 "大于" 条件，此处 _.gt(30) 是一个 "大于 30" 的条件
        tags: _.in([item])
      })
      .get()
      .then((res) => {
        page.current = 1
        page.skip = 0
        //筛选分类的时候全部展示不要分页了
        page.limit = 999
        allData.dataSource = res.data
        console.log(res);
      });
    }
    
    initData()
    provide('allData', allData)
    provide('categorizeHandle', categorizeHandle)
    provide('tagsHandle', tagsHandle)
    return{
      allData,
      changeCurrent,
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
   padding: 20px;
   flex: 2;
 }
 .article-Overview{
  flex: 1;
 }
</style>