<template>
    <div class="ArticleList">
        <div v-for="(item,index) in data.dataSource" :key="item._id">
            <ArticleItem   :detail="item"></ArticleItem>
        </div>
    </div>
</template>

<script>
import {defineComponent, reactive, toRefs} from 'vue'
import ArticleItem from "@/views/Home/childComps/Article/ArticleItem.vue";
export default defineComponent({
    name: "ArticleList",
    props: {},
    inject:['data'],

  components: {ArticleItem},
})
</script>

<style scoped lang='less'>
    .ArticleList{
        padding: 50px 20px;
    }
</style>