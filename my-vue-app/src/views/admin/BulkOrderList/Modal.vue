<template>
    <div class="AdminBulkList">

       <a-modal
          title="Title"
          v-model:visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
        >
            <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-item label="Activity name">
                <a-input v-model:value="formState.name" />
              </a-form-item>
              <a-form-item label="Activity zone">
                <a-select v-model:value="formState.region" placeholder="please select your zone">
                  <a-select-option value="shanghai">Zone one</a-select-option>
                  <a-select-option value="beijing">Zone two</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Activity time">
                <a-date-picker
                  v-model:value="formState.date1"
                  show-time
                  type="date"
                  placeholder="Pick a date"
                  style="width: 100%"
                />
              </a-form-item>
              <a-form-item label="Instant delivery">
                <a-switch v-model:checked="formState.delivery" />
              </a-form-item>
              <a-form-item label="Activity type">
                <a-checkbox-group v-model:value="formState.type">
                  <a-checkbox value="1" name="type">Online</a-checkbox>
                  <a-checkbox value="2" name="type">Promotion</a-checkbox>
                  <a-checkbox value="3" name="type">Offline</a-checkbox>
                </a-checkbox-group>
              </a-form-item>
              <a-form-item label="Resources">
                <a-radio-group v-model:value="formState.resource">
                  <a-radio value="1">Sponsor</a-radio>
                  <a-radio value="2">Venue</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="Activity form">
                <a-input v-model:value="formState.desc" type="textarea" />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit">Create</a-button>
                <a-button style="margin-left: 10px">Cancel</a-button>
              </a-form-item>
            </a-form>
        </a-modal>
        <a-button type="primary" @click="showModal">Open Modal with async logic</a-button>

       
        
    </div>
</template>

<script>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import {defineComponent, reactive, toRefs,getCurrentInstance,ref,computed} from 'vue'
import {columns} from "@/views/admin/BulkList/columns";
// import {TAGSDICT} from '@/util/map.js'
import dayjs from "dayjs";
import {useRouter} from 'vue-router'
export default defineComponent({
  name: "AdminBulkList",
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
        articleList:[],
    })
    const formState = reactive({
      name: '',
      region: undefined,
      date1: undefined,
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    });
    const modalText = ref('Content of the modal');
    const visible = ref(false);
    const confirmLoading = ref(false);
    const showModal = () => {
      visible.value = true;
    };

    const handleOk = () => {
      modalText.value = 'The modal will be closed after two seconds';
      confirmLoading.value = true;
      setTimeout(() => {
        visible.value = false;
        confirmLoading.value = false;
      }, 2000);
    };

    const onSubmit = () => {
      console.log('submit!', toRaw(formState));
    };
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
      const { result , success ,message ,total} = await proxy.$api.getQueryAPI('/bulk/query',{
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
      goDetail,
      modalText,
      visible,
      confirmLoading,
      showModal,
      handleOk,
      labelCol: {
        span:8,
      },
      wrapperCol: {
        span: 14,
      },
      formState,
      onSubmit,
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
