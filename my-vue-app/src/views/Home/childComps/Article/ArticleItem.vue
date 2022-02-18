<template>
    <div class="ArticleItem" @click="goDetail(detail.id)">
        <div class="ArticleItem-container">
          <div class="circle">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div>
            <div class="container-title">{{detail.title}}</div>
            <ul >
              <div class="pub-article-extra">
                <FolderOutlined />
                <span>分类:</span>
                <div>{{detail.categorize}}</div>
              </div>
              <div class="pub-article-extra">
                <tag-outlined />
                <span>标签:</span>
                <div><a-tag color="blue" v-for="item in detail?.tags?.split(',') " :key="item">{{item}}</a-tag></div>
              </div>
              <div class="pub-article-extra">
                <FieldTimeOutlined/>
                <div>{{((new Date(detail.createdAt)).toLocaleString())}}</div>
              </div>

            </ul>
            <div id="containercontent">
              {{detail.myDescribe}}
            </div>
          </div>
<!--          <div class="pub-article-cover" >-->
<!--            <img v-if="detail.cover" :src="'http://blog-umep.oss-cn-hangzhou.aliyuncs.com/blog/article_cover/img_1644894851896.png?x-oss-process=image/resize,w_150'" alt="">-->
<!--          </div>-->
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
          query: {
            id:value
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
    .ArticleItem{
      cursor: pointer;
      margin-bottom: 40px;
      position: relative;
      height:200px;
      box-sizing: border-box;
      overflow: hidden;

    }
    .ArticleItem-container{
        box-shadow:@box-shadow ;
        padding: 20px;
        padding-bottom: 50px;
        background: white;
        border-radius: 10px;
        text-align: center;
      .circle{
        span{ width: 30px;height: 30px;border-radius: 15px;background: red}
      }
      .pub-article-cover{
        position: absolute;
        right: 0;
        top: 0;
        height:172px;
        display: block;
        img{
          width: 300px;
          border-radius: 6px;
          height: 100%;
          display: block;
        }
      }
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
        ul{margin: 10px 0;}
        #containercontent{text-align: left}
        .container-content{
            text-indent: 2em;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            margin-bottom: 20px;
            text-align: left !important;

          .pub-article-cover{
            position: absolute;
            right: 0;
            top: 0;
            height:172px;
            display: block;
            img{
              width: 300px;
              border-radius: 6px;
              height: 100%;
              display: block;
            }
          }
        }


        .container-comein{
            float: right;
            font-size: 18px;
            a{color: #2E4C6D}
        }
    }
</style>
