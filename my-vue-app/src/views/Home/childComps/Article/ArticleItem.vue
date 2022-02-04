<template>
    <div class="ArticleItem">
        <div class="ArticleItem-container">
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
                <div><a-tag color="blue" v-for="item in detail.tags.split(',') " :key="item">{{item}}</a-tag></div>
              </div>
              <div class="pub-article-extra">
                <FieldTimeOutlined/>
                <div>{{((new Date(detail.createTime)).toLocaleString())}}</div>
              </div>

            </ul>
            <div id="containercontent">
              {{detail.myDescribe}}
            </div>
          </div>
          <div class="pub-article-cover" >
            <img v-if="detail.cover" :src="detail.cover" alt="">
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
    .ArticleItem{
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
        display: flex;
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
        .container-content{
            text-indent: 2em;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            margin-bottom: 20px;
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

				#containercontent{
					color: black;
				}
        .container-comein{
            float: right;
            font-size: 18px;
            a{color: #2E4C6D}
        }
    }
</style>