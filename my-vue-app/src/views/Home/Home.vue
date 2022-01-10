<template>
 <div class="home">
  <div class="banner"></div>
  <div class="article">
   <div class="article-ArticleList">
   <ArticleList />
    <!-- <router-view/> -->
    <a-pagination  v-model:current="current" :total="total" :pageSize='limit' @change='changeCurrent'/>
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
    <img :src="data.url" alt="">
   </div>
   <div class="article-Overview">
    <Overview/>
   </div>
  </div>
 </div>
</template>

<script>
import {defineComponent, reactive, toRefs,getCurrentInstance,provide,ref} from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue';
import {useRouter} from 'vue-router'
import ArticleList from "@/views/Home/childComps/Article/ArticleList.vue";
import Overview from "@/views/Home/childComps/Overview/Overview.vue";
import {client} from '@/util/aliOss.js'
export default defineComponent({
  name: 'Home',
  props: {
    id:[Number],
  },
  setup(props){
    console.log(props);
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

    



    const fileList = ref([]);
    const uploading = ref(false);
    const {proxy} = getCurrentInstance()
    const router = useRouter()
    const limit = 3
    let current = ref(+props.id)
    let total = ref(0)
    let data = reactive({dataSource:[],url:'',tagList:[]})
    //获取总数
    proxy.$api.getCount('article').then(res=>{
      total.value = res.total
    })
    const initList = ()=>{
      proxy.$api.getList('article',{skip:(current.value-1)*limit,limit}).then(res=>{  
          console.log(res)
          data.dataSource= [...res.data]
      })
    }
    proxy.$api.getList('classify').then(res=>{  
      console.log(res)
      data.tagList= [...res.data[0].tags]
    })
    const changeCurrent = (v) =>{
      console.log( v);
      current.value =v
      router.push({name:'Home',params:{id:v}})
      initList()
    }
    const handleUpload = () => {
      uploading.value = true; // You can use any AJAX library you like
      proxy.$api.uploadOss(fileList.value[0],fileList.value[0].name).then(res=>{
        console.log(res);
        data.url = res
      })
    };
    initList()
    provide('data', data)
    return{
      data,
      current,
      limit,
      total,
      changeCurrent,

      fileList,
      uploading,
      handleRemove,
      beforeUpload,
      handleUpload,
    }
  },
  components: {
   ArticleList,Overview,UploadOutlined  
  },
})
</script>

<style scoped >
  .home{
  }
  .article{
    display: flex;
  }
 .article-ArticleList{
   
   flex: 2;
 }
 .article-Overview{
  flex: 1;
 }
</style>