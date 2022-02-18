<template>
    <div class="AdminArticleList">

        <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
        <a-table rowKey="id" bordered :data-source="articleList" :columns="columns"  :pagination='page' @change='changeCurrent' :loading="loading">
					<template #operation="{ record }">
            <a-button type="primary" @click="handEdit(record)">编辑</a-button>
            <a-popconfirm placement="topRight" ok-text="Yes" cancel-text="No" @confirm="confirm">
              <template #title>
                <p>{{ text }}</p>
                <p>{{ text }}</p>
              </template>
              <a-button type="danger" @click="handDelete(record)">删除</a-button>
            </a-popconfirm>
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

    /**
     *分页
     */
    const page = reactive({
      current:1,//当前页
      // pageNum:`1,${HOME_LIMIT}`,
      pageSize:5,//显示多少条默认5
      total:0
    })
    /**
     * 查询条件
     */
    const condition = reactive({
      orderBy:'id,DESC',
      where:{},
    })
    const getArticle  = async () => {
      const { result , success ,message ,total} = await proxy.$api.getQueryAPI('article',{
        ...page
      })
      if(success){
        initData.articleList = [...result.rows]
        page.total = result.count
        initData.articleTotal = result.count
      }
    }
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
      // page.limit  = (v-1)*page.pageSize+','+page.pageSize
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
