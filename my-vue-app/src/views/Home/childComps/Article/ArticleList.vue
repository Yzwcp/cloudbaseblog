<template>
    <div class="ArticleList">
      <div v-if="initData?.articleList?.length>0">
        <div v-for="(item,index) in initData.articleList" :key="item.Id">
          <ArticleItem   :detail="item"></ArticleItem>
        </div>
      </div>
      <div v-else style="height:600px">没有数据了</div>
        <!-- <a-pagination v-model="current" :total="allData.dataSource.length" show-less-items /> -->
    </div>
</template>

<script>
import {defineComponent, reactive, toRefs} from 'vue'
import ArticleItem from "@/views/Home/childComps/Article/ArticleItem.vue";
export default defineComponent({
    name: "ArticleList",
    props: {},
    allData(){
        return{
            current:1
        }
    },
    inject:['initData'],
    mounted(){},
    components: {ArticleItem},
})
</script>

<style scoped lang='less'>
    .ArticleList{
    }
</style>
