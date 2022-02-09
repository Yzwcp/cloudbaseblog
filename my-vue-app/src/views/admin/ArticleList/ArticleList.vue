<template>
    <div class="AdminArticleList">

        <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
        <a-table rowKey="Id" bordered :data-source="articleList" :columns="columns"  :pagination='page' @change='changeCurrent' :loading="loading">
					<template #operation="{ record }">
						<a @click="handEdit(record)">编辑</a>
        	</template>
        </a-table>

    </div>
</template>

<script>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import {defineComponent, reactive, toRefs,getCurrentInstance,ref,computed} from 'vue'
import {columns} from "@/views/admin/ArticleList/columns";
// import {TAGSDICT} from '@/util/map.js'
import dayjs from "dayjs";
import {useRouter} from 'vue-router'
import {HOME_LIMIT} from "@/util/config.js";
export default defineComponent({
    name: "AdminArticleList",
    data(){
        return{
            clazz:'ArticleList',
            title:'所有文章',
        }
    },
    props: {},

    setup(props,{emit}){
        const {proxy}=getCurrentInstance()
        const router = useRouter()
        const limit = 6
        let current = ref(1)
        let total = ref(0)
        let loading = ref(false)
        let initData = reactive({
            articleList:[]
        })
        const getArticle  = async () => {
          const { result , success ,message ,total} = await proxy.$api.getQueryAPI('article',page.where,page.orderBy,page.limit,true)
          if(success){
            initData.articleList = [...result]
            page.total = total
            initData.articleTotal = total
          }
        }
        /**
         *分页
         */
        const page = reactive({
          current:1,//当前页
          limit:`1,${HOME_LIMIT}`,
          pageSize:HOME_LIMIT,//显示多少条默认5
          orderBy:'id',
          where:'',
          total:0
        })
        const handEdit = (text)=>{
            router.push({
                //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
                name: 'adminPublish',
                params: {
                    text:JSON.stringify(text)
                }
            });
        }
        const changeCurrent = (value) =>{
          let v = value.current
          page.current = v
          page.limit  = (v-1)*page.pageSize+','+page.pageSize
          console.log(page.limit)
          getArticle()
        }
        getArticle()
        return{
          page,
          ...toRefs(initData),
          columns,
          dayjs,
          changeCurrent,
          handEdit,
          loading
        }
    },
    methods:{
        handleAdd(){
            this.$router.push('/admin/publish')
        },
    },
      activated(){
          console.log('ac');
  },
    components: {
        SmileOutlined,
        DownOutlined,
    },
})
</script>

<style scoped lang='less'>

</style>
