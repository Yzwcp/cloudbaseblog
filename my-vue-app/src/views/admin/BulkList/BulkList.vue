<template>
    <div class="AdminBulkList">

       <a-modal
          title="Title"
          v-model:visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
        >
            <a-form ref="form" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-item name="creator" label="创建者">
                <a-input v-model:value="formState.creator" />
              </a-form-item>
              <a-form-item name="title" label="产品标题">
                <!-- <a-select v-model:value="formState.title" placeholder="商品标题">
                  <a-select-option value="shanghai">Zone one</a-select-option>
                  <a-select-option value="beijing">Zone two</a-select-option>
                </a-select> -->
                <a-input v-model:value="formState.title" />
              </a-form-item>
              <a-form-item name="endtime" label="结束时间">
                <a-date-picker
                  v-model:value="formState.endtime"
                  show-time
                  type="date"
                  placeholder="日期"
                  valueFormat="YYYY-MM-DD HH:mm"
                  style="width: 100%"
                  @ok="dateOk"
                />
              </a-form-item>
              <a-form-item  name="oldprice"  label="原价">
                <a-input-number v-model:value="formState.oldprice"  />
              </a-form-item>
              <a-form-item  name="groupsize" label="一共需要多少人">
                <a-input-number v-model:value="formState.groupsize"  />
              </a-form-item>
              <a-form-item  name="oldppricerice" label="价格">
                <a-input-number v-model:value="formState.oldppricerice"  />
              </a-form-item>
              <a-form-item  name="sort" label="排序">
                <a-input-number v-model:value="formState.sort"  />
              </a-form-item>
              <a-form-item  label="图片" v-if="visible">
                  <a-upload
                  action="http://localhost:3030/common/upload"
                  list-type="picture"
                  @change="handleUploadChange"
                  v-model:defaultFileList="defaultFileList"
                  v-model:fileList="upfileList"
                >
                  <a-button>
                    上传图片
                  </a-button>
                </a-upload>
              </a-form-item>
              <a-form-item   name="status"  label="状态">
                <a-radio-group v-model:value="formState.status">
                  <a-radio :value="1">上架</a-radio>
                  <a-radio :value="-1">下架</a-radio>
                </a-radio-group>
              </a-form-item>
              
              <!-- <a-form-item label="Activity form">
                <a-input v-model:value="formState.desc" type="textarea" />
              </a-form-item> -->
           
            </a-form>
        </a-modal>
        <a-button type="primary" @click="showModal">添加</a-button>
        <a-table rowKey="id"  :data-source="bulkList" :columns="columns"  :pagination='page' @change='changeCurrent' :loading="loading">
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
           <template #image="{ text,record }">
             <img style="width:50px;display:inline-block" :src="tools.longUrl(item)" v-for="item in text.split(',')" :key="item" alt="">
          </template>
          <template #id="{ text,record }">
            <a @click="goDetail(record)">{{text}}</a>
          </template>
        </a-table>
       
        
    </div>
</template>

<script>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import {defineComponent,nextTick, reactive,toRefs,getCurrentInstance,ref,computed,toRaw,watch} from 'vue'
import {columns} from "@/views/admin/BulkList/columns";
// import {TAGSDICT} from '@/util/map.js'
import dayjs from "dayjs";
import {useRouter} from 'vue-router'
import {tools} from '@/util/tools';
export default defineComponent({
  name: "AdminBulkList",
  data(){
      return{
          clazz:'bulkList',
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
        bulkList:[],
    })
    const form = ref(null)
    let formState = ref({
      creator: '官方',
      image: '',
      title: '',
      oldprice: 0,
      price:0,
      groupsize: '',
      status: '',
      sort: '',
      watchered: 0,
      okpeople:0,
      endtime:''
    });
    let defaultFileList =ref([])
    let upfileList =ref([])
    const modalText = ref('Content of the modal');
    const visible = ref(false);
    const confirmLoading = ref(false);
    const editMode = ref('add')
    const randam = ref(1)
    watch(visible,()=>{
      randam.value= Math.random()
      console.log(randam.value);
    })
    const showModal = () => {
      defaultFileList.value =[]
      nextTick(()=>{
       form.value && form.value.resetFields()
      })
      
      visible.value = true;
      editMode.value='add'

    };
    const dateOk = (v,vstr)=>{
      console.log(vstr);
    }
    const handleOk = async() => {

      confirmLoading.value = true;
      let res = {}
      formState.value.image =tools.shortUrl(upfileList.value)
      formState.value.endtime = Number(new Date(formState.value.endtime).getTime())
      if(editMode.value=="add"){
        formState.value.id && delete  formState.value.id
        res =await proxy.$api.saveAPI('/wx/bulk',toRaw(formState.value))
      }else{
        res =await proxy.$api.modifyAPI('/wx/bulk',toRaw(formState.value))
      }
      console.log(res.success);
      if(res.success){
        proxy.$message.success(res.message)
      }
      visible.value = false;
      confirmLoading.value = false;
      getBulk()
    };
    const handleUploadChange = ({file,fileList=[]})=>{
      if(file.response && file.response.success && file.status !== 'uploading'){
         fileList.map(res=>{
            if(res.response){
              let s = res.response.result
              res.shorturl =s.url
              res.url =tools.longUrl(s.url)
              res,name = s.name
            }
        });
        const list =[...fileList]
        upfileList.value=list
        formState.value.image += file.response.result.url+","
      }
    }
    const onSubmit = () => {
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
    const getBulk  = async () => {
      const { result , success ,message ,total} = await proxy.$api.getQueryAPI('/wx/bulk',{
        ...page
      })
      if(success){
        initData.bulkList = [...result.rows]
        page.total = result.count
        initData.articleTotal = result.count
      }
    }
    const handEdit = (text)=>{
      editMode.value='edit'
      visible.value = true;
      upfileList.value=[]
      let list = []
      text.image && text.image.split(',').map((item,index)=>{
        if(item){
          list.push({url:tools.longUrl(item),shorturl:item,uid:index,name:item})
        }
      })
      nextTick(()=>{
        formState.value = {...toRaw(text)}
        upfileList.value.push(...list) 
      })
    }
    const handDelete =async (record)=>{
      const reslut =  await proxy.$api.removeAPI('/wx/bulk',{id:record.id})
      if(reslut.success){
        getBulk()
        proxy.$message.success({content:reslut.message})
      }

    }
    const changeCurrent = (value) =>{
      let v = value.current
      page.current = v
      // page.limit  = (v-1)*page.pageSize+','+page.pageSize
      getBulk()
    }
    const privateChange = async(value)=>{
      let v = value
      if(v.password)delete v.password
      const {success,message}  = await proxy.$api.modifyAPI('/article',{...v,private:!v.private})
      if(success){
        proxy.$message.success({content:message})
        getBulk()
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
    getBulk()
    return{
      page,
      form,
      randam,
      tools,
      handleUploadChange,
      dateOk,
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
      defaultFileList,
      upfileList,
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
