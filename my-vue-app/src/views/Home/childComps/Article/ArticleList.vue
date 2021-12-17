<template>
    <div class="ArticleList">
        <ArticleItem></ArticleItem>
        <ArticleItem></ArticleItem>
    </div>
</template>

<script>
import {defineComponent, reactive, toRefs} from 'vue'
import ArticleItem from "@/views/Home/childComps/Article/ArticleItem.vue";
export default defineComponent({
    name: "ArticleList",
    props: {},
    components: {ArticleItem},
})
</script>

<style scoped lang='less'>
    .ArticleList{
        padding: 50px 20px;
    }
</style>