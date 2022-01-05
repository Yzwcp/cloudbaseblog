<template>
 <div>
  <div class="banner"></div>
  <div class="article">
   <div class="article-ArticleList">
<!--    <ArticleList />-->
    <router-view/>
    <a-pagination v-show="$route.path='/aricleList'" v-model="current" :total="total" :pageSize='limit' @change='changeCurrent'/>
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
import ArticleList from "@/views/Home/childComps/Article/ArticleList.vue";
import Overview from "@/views/Home/childComps/Overview/Overview.vue";
export default defineComponent({
  name: 'Home',
  props: {
  },
  setup(){
    const fileList = ref([]);
    const uploading = ref(false);
    const client = new OSS({
        region: 'oss-cn-hangzhou',
        accessKeyId: 'LTAI5tSVCiLtVtAuTdPRGwXj',
        accessKeySecret: 'Sdd1UvlKU7O1fURsvFVhKgIy837J5r',
        bucket: 'blog-umep',
        path: 'blog/'
    })
    client.list().then(res=>{
      console.log(res);
    })
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

    const handleUpload = () => {
      const formData = new FormData();
      fileList.value.forEach(file => {
        formData.append('files[]', file);
      });
      console.log(formData);
      console.log(fileList.value);
      uploading.value = true; // You can use any AJAX library you like
      client.put('blog/blog_'+fileList.value[0].name, fileList.value[0]).then(function (r1) {
        console.log('put success: %j', r1);
        return client.get('object');
      }).then(function (r2) {
        console.log('get success: %j', r2);
      }).catch(function (err) {
        console.log('error: %j', err);
      });  
      // request('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
      //   method: 'post',
      //   data: formData,
      // }).then(() => {
      //   fileList.value = [];
      //   uploading.value = false;
      //   message.success('upload successfully.');
      // }).catch(() => {
      //   uploading.value = false;
      //   message.error('upload failed.');
      // });
    };




    const {proxy} = getCurrentInstance()
    const limit = 3
    let current = ref(1)
    let total = ref(0)
    let data = reactive({dataSource:[]})
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
    const changeCurrent = (v) =>{
      console.log( v);
      current.value =v
      initList()
    }
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