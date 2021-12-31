<template>
    <div class="ArticleDetail">
        <div class="ArticleDetail-container">
            <div class="container-title">{{data.detail.title}}</div>
            <ul  class="container-msg">
                <span>vue</span>
                <span>react</span>
                <span class="container-time">{{data.detail.createTime}}</span>
                <span class="container-popular">{{data.detail.like}}</span>
            </ul>
            <div id="containercontent"> </div>
        </div>
    </div>
</template>

<script>
  import { defineComponent, reactive, toRefs ,getCurrentInstance,onMounted,nextTick} from 'vue'
  import Vditor from "vditor";
  import { useRoute } from 'vue-router'
  export default defineComponent({
    name: 'ArticleDetail',
    props: {},
    components: {},
    setup(){
      const route = useRoute()
      const {proxy} = getCurrentInstance()
      let data = reactive({
        detail:{}
      })
      let detailId = route.query.id
      proxy.$api.getDetail('article',{
        _id:detailId
      }).then(res=>{
        data.detail ={... res.data[0]}
      })

      onMounted(()=>{
        let id = document.querySelector('#containercontent')
        setTimeout(()=>{
          Vditor.preview(id,data.detail.body,{
            hljs:{
              style:'dracula'
            },
            i18n:'zh_CN'
          })
        },500)
      })
      return{
        data
      }

    },
    mounted() {


    },
  })
</script>

<style scoped lang='less'>
    .ArticleDetail{margin-bottom: 40px}
    .ArticleDetail-container{
        box-shadow:  0px 0px 14px -10px @99-base-color ;
        padding: 20px;
        padding-bottom: 50px;
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