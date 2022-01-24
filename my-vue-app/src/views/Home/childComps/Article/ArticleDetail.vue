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
        
						<ArticleComment :article='data.detail._id' :comment='data.comment'/>
				
    </div>
</template>

<script>
  import { defineComponent, reactive, toRefs ,getCurrentInstance,onMounted,nextTick,ref, provide,h} from 'vue'
  import {HomeOutlined,TagOutlined,FolderOutlined,FieldTimeOutlined,LikeOutlined} from '@ant-design/icons-vue';
	import ArticleComment from './ArticleComment.vue'
  import Vditor from "vditor";
	import config from '@/util/config.js'
  import { useRoute } from 'vue-router'
  export default defineComponent({
    name: 'ArticleDetail',
    props: {},
    components: {HomeOutlined,TagOutlined,FolderOutlined,FieldTimeOutlined,LikeOutlined,ArticleComment},
    setup(props){
      const route = useRoute()
      const {proxy} = getCurrentInstance()
      let data = reactive({
        detail:{},
				comment:[]
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
              style:'dracula',
							lineNumber:true,
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
			/**
			 *渲染大纲
			 */
      const initOutline = () => {
        const headingElements = []
        Array.from(document.getElementById('preview').children).forEach((item) => {
          if (item.tagName.length === 2 && item.tagName !== 'HR' && item.tagName.indexOf('H') === 0) {
            headingElements.push(item)
          }
        })
        let toc = []
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
              // console.log(document.querySelector('span[data-target-id="' + toc[index].id + '"]'));
              document.querySelector('span[data-target-id="' + toc[index].id + '"]').classList.add('vditor-outline__item--current')
              // console.log(index);
              break
            }
          }
        })
      }
			/**
				发送评论
			 */
			const sendComment = async (params) => {
				let heroInfo = localStorage.getItem('heroInfo')
				if(heroInfo==null){
					const {sanGuo} = config
					const list1 = ['曹魏','蜀汉','孙吴']
					const list2 = ['文臣','武将']
					const t = Object.keys(sanGuo).length -1 
					const campRandom = Math.round(Math.random()*t) // 阵营 随机数
					const camp = list1[campRandom]//阵营
					const wenAndwuRandom = Math.round(Math.random()*1) // 文 or 武 随机数
					const wenAndwu = list2[wenAndwuRandom] //文武
					const list3 = sanGuo[camp][wenAndwu] //随机出来的英雄列表
					const t3 = Math.round(Math.random()*(list3.length-1))//随机一个英雄
					const hero = list3[t3]
					heroInfo = [camp,wenAndwu,hero]
					localStorage.setItem('heroInfo',[camp,wenAndwu,hero])			
				}
				await	proxy.$api.add('comment',{...params,likeList:[],heroInfo:heroInfo})
				initComent()
			}
			/**
				初始化评论
			 */
			const initComent = ()=>{
				proxy.$api.getList('comment',{skip:0,limit:999},{articleId:detailId},{name:'createTime',type:'desc'}).then(res=>{
					data.comment =[... res.data]
				})
			}
			/**
				喜欢
			 */

			const handleLike = (item)=>{
				const	command = proxy.$api.db.command
				if(item.likeList.includes(agentMd5))return 	proxy.$message.error({content:'你已经点过赞了'})
				proxy.$api.db.collection("comment")
				.doc(item._id)
				.update({
					like: command.inc(1),
					likeList:command.unshift(agentMd5)
				})
				.then((res) => {
				console.log(res);
					if(res.updated>0){
						proxy.$message.success({content:'+1'})
						initComent()
					}
				});
			}
			initComent()
			provide('sendComment',sendComment)
			provide('handleLike',handleLike)
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
        box-shadow:@box-shadow ;
    }

    .ArticleDetail-container{
        box-shadow:@box-shadow ;
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