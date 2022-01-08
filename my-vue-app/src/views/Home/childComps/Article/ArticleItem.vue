<template>
    <div class="ArticleItem">
        <div class="ArticleItem-container">
            <div class="container-title">{{detail.title}}</div>
            <ul  class="container-msg">
                <span>vue</span>
                <span>react</span>
                <span class="container-time">{{detail.createTime}}</span>
                <span class="container-popular">{{detail.like}}</span>
            </ul>
            <div id="containercontent">

            </div>
            <div class="container-comein">
                <router-link :to="{path:'/detail',query:{id:detail._id}}">访问全文</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent, reactive, toRefs} from 'vue'
import {useRouter} from 'vue-router'

export default defineComponent({
    name: "ArticleItem",
    props: ['detail'],
    setup(){
      const  router = useRouter()
      const goDetail = (value)=>{
        router.push({
          //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
          name: 'ArticleDetail',
          params: {
            text:JSON.stringify(value)
          }
        });
      }
      return{
        goDetail
      }
    },
    mounted() {
    },
  components: {},
})
</script>

<style  lang='less'>
    .ArticleItem{margin-bottom: 40px;}
    .ArticleItem-container{
        box-shadow:  0px 0px 14px -10px @99-base-color ;
        padding: 20px;
        padding-bottom: 50px;
        background: white;
        border-radius: 10px;
        .container-title{
            font-weight: 600;
            font-size: 28px;
            color: @88-base-color;
        }
        .container-msg{
            span{
                margin-right: 20px;
                color: black;
                opacity: .5;
            }
        }
        .container-content{
            text-indent: 2em;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            margin-bottom: 20px;
        }
        .container-comein{
            float: right;
            font-size: 18px;
            a{color: #2E4C6D}
        }
    }
</style>