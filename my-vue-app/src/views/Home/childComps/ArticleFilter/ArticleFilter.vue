<template>
 <div>
  <div>
    <folder-open-outlined style="marginRight:6px"/>分类
    <span style="marginLeft:20px">/{{ allData.categorizeItem.title}}</span>
  </div>
  <div>
    <li @click="categorizeHandle({})">显示全部文章</li>
    <li v-for="item in allData.categorizeList" :key="item._id" :class="item._id==allData.categorizeItem._id?'active':''" @click="categorizeHandle(item)">{{ item.title }}</li>
  </div>

 </div>
</template>

<script>
import {defineComponent, reactive, toRefs} from 'vue'
import {FolderOpenOutlined} from '@ant-design/icons-vue';

export default defineComponent({
  name: 'ArticleFilter',
  props: {
    
  },
  inject:['allData','categorizeHandle'],
  components: {
    FolderOpenOutlined
  },
})
</script>

<style scoped lang='less'>
  li{
    border-bottom: 1px solid #f0f0f0;
    padding-left: 10px;
    line-height: 40px;
    cursor:pointer
  }
  li:hover{
    background: #f8f8f8;
  }
  .active{
    border-left:1px solid @99-base-color;
  }
</style>