<template>
    <div class="AdminArticleList">

        <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
        <a-table rowKey="id" bordered :data-source="articleList" :columns="columns"  :pagination='page' @change='changeCurrent' :loading="loading">
					<template #operation="{ record }">
            <a-button type="primary" @click="handEdit(record)">编辑</a-button>
            <a-popconfirm placement="topRight" ok-text="Yes" cancel-text="No" @confirm="handDelete(record)">
              <template #title>
                <p>确定删除该文章么？</p>
              </template>
              <a-button type="danger" >删除</a-button>
            </a-popconfirm>
        	</template>
          <template #private="{ text,record }">
            <a-switch checked-children="隐藏" un-checked-children="显示" :checked="record.private"   @change="privateChange(record)" />
          </template>
          <template #id="{ text,record }">
            <a @click="goDetail(record)">{{text}}</a>
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
      const { result , success ,message ,total} = await proxy.$api.getQueryAPI('/article/admin',{
        ...page
      })
      console.log(proxy.$api);
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
    const handDelete =async (record)=>{
      const reslut =  await proxy.$api.removeAPI('article',{id:record.id})
      console.log(reslut);
      if(reslut.success){
        getArticle()
         proxy.$message.success({content:reslut.message})
      }

    }
    const changeCurrent = (value) =>{
      let v = value.current
      page.current = v
      // page.limit  = (v-1)*page.pageSize+','+page.pageSize
      getArticle()
    }
    const privateChange = async(value)=>{
      let v = value
      if(v.password)delete v.password
      const {success,message}  = await proxy.$api.modifyAPI('/article',{...v,private:!v.private})
      if(success){
        proxy.$message.success({content:message})
        getArticle()
      }
    }
    const goDetail = (value)=>{
      router.push({
        //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
        name: 'ArticleDetail',
        query: {
          id:value.id,
          body:value.password? 1:0
        }
      });
    }
    getArticle()
    return{
      page,
      ...toRefs(initData),
      columns,
      dayjs,
      changeCurrent,
      handEdit,
      loading,
      privateChange,
      handDelete,
      goDetail
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
