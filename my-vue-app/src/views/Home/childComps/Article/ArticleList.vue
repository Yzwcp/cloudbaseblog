<template>
    <div class="ArticleList">
        <div v-for="(item,index) in allData.dataSource" :key="item._id">
            <ArticleItem   :detail="item"></ArticleItem>
        </div>
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
    inject:['allData'],
    mounted(){},
    components: {ArticleItem},
})
</script>

<style scoped lang='less'>
    .ArticleList{
        padding: 0px 20px;
    }
</style>