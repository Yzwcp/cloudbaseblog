<template>
 <div>
  <div class="banner"></div>
  <div class="article">
   <div class="article-ArticleList">
    <ArticleList />
   </div>
   <div class="article-Overview">
    <Overview/>
   </div>
  </div>
 </div>
</template>

<script>
import {defineComponent, reactive, toRefs} from 'vue'
import ArticleList from "@/views/Home/childComps/Article/ArticleList.vue";
import Overview from "@/views/Home/childComps/Overview/Overview.vue";
export default defineComponent({
  name: 'Home',
  props: {
    
  },
  components: {
   ArticleList,Overview
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