<template>
    <div class="Overview" :style="{'height':contentArticleHeight+'px'}">
<!--        个人展示-->
        <div class="profile">
            Umep
        </div>
<!--        公告-->
        <div class="notice">
            有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充。
        </div>
<!--        文章统计-->
        <div class="statistical">
            <div>文章</div>
            <div>分类</div>
            <div>标签</div>
            <div>{{initData.articleTotal}}</div>
            <div>{{initData.classifyTotal}}</div>
            <div>{{initData.tagsTotal}}</div>
        </div>
<!--        标签-->
        <div class="tags">
            <span @click="tagsHandle(item.value)" :style="{color:tools.get16Color()}" v-for="item in initData?.tagsList" :key="item">{{item.value}}</span>
        </div>
<!--        社交-->
        <div class="social">
            github
        </div>
<!--        网站信息-->
        <div class="website">
            <div>网站总浏览量</div>
            <div>864</div>
            <div>运行天数</div>
            <div>555</div>
        </div>

    </div>
</template>

<script>
  import {defineComponent, reactive, toRefs,onMounted,watch,ref} from 'vue'
  import {tools} from '@/util/tools.js'
  import {onBeforeRouteUpdate} from 'vue-router'
  import Vditor from "vditor";

    export default defineComponent({
        name: "Overview",
        props: {},
        components: {},
        computed:{
            tools:()=>tools
        },
        inject:['initData','tagsHandle'],

        setup(){
          
          return{
          }
        },
    })
</script>

<style scoped lang='less'>
  
    .Overview{
        margin-left: 30px;
        overflow: visible;
        >div{
            background: white;
            margin-bottom: 20px;
            padding:20px;
            border-radius: 10px;
            box-shadow:@box-shadow ;
        }
        .statistical{
            display: grid;
            grid-template-row: 100px 100px;
            grid-template-columns: repeat(3,100px);
            text-align: center;
        }
        .notice{
            text-indent: 2em;
        }
        .tags{
           span{
                margin: 6px;
                font-size: 18px;
                cursor:pointer

           }
        }
        .website{
            display: grid;
            grid-template-columns: 2fr 1fr;
            grid-template-row: repeat(2 , 1fr);
        }
        
    }

</style>