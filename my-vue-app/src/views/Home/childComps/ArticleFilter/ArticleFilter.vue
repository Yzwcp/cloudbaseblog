<template>
 <div>
  <div>
    <folder-open-outlined style="marginRight:6px"/>分类
    <span style="marginLeft:20px">/{{selectData.value}}</span>
  </div>
  <div>
    <li @click="filterAticle(null)">全部文章</li>
    <li v-for="item in initData.classifyList"   :class="item.id==selectData.id?'active':''"  :key="item.Id" @click="filterAticle(item)">{{ item.value }}</li>
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
  data(){
    return{
      selectData:{},
    }
  },
  inject:['initData','categorizeHandle'],
  methods:{
    filterAticle(v){
      this.selectData = {...v}
      this.categorizeHandle(v?.value)
    },
  },
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
    cursor:pointer;
    list-style: none;

  }
  li:hover{
    background: #f8f8f8;
  }
  .active{
    border-left:2px solid @99-base-color;
  }
</style>
