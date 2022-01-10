<template>
    <div class="ArticleDetail">
        <!-- <div id="outline"></div> -->
        <div class="ArticleDetail-container">
            <div class="container-title">{{data.detail.title}}</div>
            <ul  class="container-msg">
                <div class="pub-article-extra">
                  <FolderOutlined />
                  <span>分类:</span>
                  <div>{{data.detail.categorize}}</div>
                </div>
                <div class="pub-article-extra">
                  <tag-outlined />
                  <span>标签:</span>
                  <div><a-tag color="blue" v-for="item in data.detail.tags " :key="item">{{item}}</a-tag></div>
                </div>
                <div class="pub-article-extra">
                  <FieldTimeOutlined/>
                  <span>创建时间:</span>
                  <div>{{((new Date(data.detail.createTime)).toLocaleString())}}</div>
                </div>
                <div class="pub-article-extra">
                  <like-outlined />
                  <span>like:</span>
                  <div>{{data.detail.like}}</div>
                </div>
            </ul>
            <div id="preview"> </div>
        </div>
        <div>
          <div id="outline"></div>
        </div>
    </div>
</template>

<script>
  import { defineComponent, reactive, toRefs ,getCurrentInstance,onMounted,nextTick,ref} from 'vue'
  import {HomeOutlined,TagOutlined,FolderOutlined,FieldTimeOutlined,LikeOutlined} from '@ant-design/icons-vue';
  import Vditor from "vditor";
  import { useRoute } from 'vue-router'
  export default defineComponent({
    name: 'ArticleDetail',
    props: {},
    components: {HomeOutlined,TagOutlined,FolderOutlined,FieldTimeOutlined,LikeOutlined},
    setup(props){
      console.log(props);
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
        let id = document.getElementById('preview')
        setTimeout(()=>{
          Vditor.preview(id,data.detail.body,{
            hljs:{
              style:'dracula'
            },
            i18n:'zh_CN',
            after(){
              randerOverView()
            },
          })
          
        },500)
      })
      const randerOverView = ()=>{
        const outlineElement = document.querySelector('#outline')
        console.log(outlineElement);
        let id = document.getElementById('preview')
        if(!id){
          return outlineElement.style.display='none'}
        // contentArticleHeight.value = document.querySelector('.ArticleDetail-container').offsetHeight
        Vditor.outlineRender(id, outlineElement,)
          if (outlineElement.innerText.trim() !== '') {
          outlineElement.style.display = 'block'
          initOutline()
        }
      }
      const initOutline = () => {
        const headingElements = []
        Array.from(document.getElementById('preview').children).forEach((item) => {
          if (item.tagName.length === 2 && item.tagName !== 'HR' && item.tagName.indexOf('H') === 0) {
            headingElements.push(item)
          }
        })
        let toc = []
        console.log(headingElements);
        window.addEventListener('scroll', () => {
          const scrollTop = window.scrollY
          toc = []
          headingElements.forEach((item) => {
            toc.push({
              id: item.id,
              offsetTop: item.offsetTop,
            })
          })
          const currentElement = document.querySelector('.vditor-outline__item--current')
          for (let i = 0, iMax = toc.length; i < iMax; i++) {
            if (scrollTop < toc[i].offsetTop - 30) {
              if (currentElement) {
                currentElement.classList.remove('vditor-outline__item--current')
              }
              let index = i > 0 ? i - 1 : 0
              console.log(toc);
              // console.log(document.querySelector('span[data-target-id="' + toc[index].id + '"]'));
              document.querySelector('span[data-target-id="' + toc[index].id + '"]').classList.add('vditor-outline__item--current')
              // console.log(index);
              break
            }
          }
        })
      }
      return{
        data
      }

    },
    mounted() {


    },
  })
</script>

<style scoped lang='less'>
  
    .ArticleDetail{
      margin-bottom: 40px;
      padding: 50px 0;
      display: grid;
      grid-template-columns: 3fr  1fr;
    }
    #outline{
        width: 300px;
        display: none;
        position: sticky;
        right:300px;
        position: -webkit-sticky;
        top: 0px;
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-template-row: repeat(2 , 1fr);
        background: white;
        margin-left: 100px;
        box-shadow:  0px 0px 14px -10px @99-base-color ;
    }
    .ArticleDetail-container{
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