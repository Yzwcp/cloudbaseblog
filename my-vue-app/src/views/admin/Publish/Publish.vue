<template>
  <div class="Publish">
    <a-card>

      <a-row  style="height:140px;">
        <a-form
          :model="formState"
          name="basic"
          autocomplete="off"
          @finish="onFinish"
          ref="formRef"
          layout="inline"
          @finishFailed="onFinishFailed"
          style="width:100%"
        >
          <a-col :md="{span:3}">
            <a-form-item name="categorize" label="分类" :rules="[{ required: true, message: '填写分类' }]">
              <a-select
                ref="select"
                v-model:value="formState.categorize"
                style="width: 120px"
                placeholder="请选择分类"
              >
                <a-select-option v-for="(item,index) in classifyList" :value="item.value" :key="item._id">{{item.label}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span='4'>

            <a-form-item name="tags" label="标签" :rules="[{ required: true, message: '填写tags' }]">
              <a-select
                :options="tagsList"
                mode="multiple"
                placeholder="选择或添加标签"
                style="width: 200px"
                v-model:value="formState.tags"
                @change='tagsChange'
                :dropdownStyle='{"position":"realtive"}'

              >
                <template #dropdownRender="{ menuNode: menu }">
                  <v-nodes :vnodes="menu" />
                  <a-divider style="margin: 4px 0" />
                  <div
                    style="padding: 4px 8px; cursor: pointer"
                    @mousedown="e => e.preventDefault()"
                    @click="showInputModal"
                  >
                    <plus-outlined />
                    添加标签
                  </div>
                </template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span='4'>
            <a-form-item name="title" label="标题" :rules="[{ required: true, message: '添加标题' }]">
              <a-input style="width: 200px" v-model:value="formState.title" placeholder="标题" />
            </a-form-item>
          </a-col>
          <a-col :span='4'>
            <a-form-item name="myDescribe" label="描述" :rules="[{ required: true, message: '添加描述' }]">
              <a-input  v-model:value="formState.myDescribe" placeholder="描述" />
            </a-form-item>
          </a-col>
<!--          <a-col :span='2'>-->
<!--            <a-select-->
<!--                ref="select"-->
<!--                v-model:value="path.value"-->
<!--                style="width: 140px"-->
<!--                placeholder="请选择上传路径"-->
<!--            >-->
<!--              <a-select-option v-for="(item,index) in path.pathList" :value="item.value" :key="item.value">{{item.label}}</a-select-option>-->
<!--            </a-select>-->
<!--          </a-col>-->
<!--          <a-col :span='2'>-->
<!--            <a-upload  :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload"  >-->
<!--              <a-button >-->
<!--                <upload-outlined></upload-outlined>-->
<!--                选择封面-->
<!--              </a-button>-->
<!--            </a-upload>-->
<!--            <a-button-->
<!--                type="primary"-->
<!--                :disabled="fileList.length === 0"-->
<!--                style="margin-top: 16px"-->
<!--                @click="handleUpload"-->
<!--            >-->
<!--              {{ uploading ? '上传中' : '上传' }}-->
<!--            </a-button>-->
<!--            <a-upload-->
<!--              name="file"-->
<!--              :multiple="true"-->
<!--              action="http://localhost:3000/upload"-->
<!--              @change="handleChange"-->
<!--            >-->
<!--              <a-button> <a-icon type="upload" /> Click to Upload </a-button>-->
<!--            </a-upload>-->
<!--          </a-col>-->
          <a-col :span='3'>
            <a-form-item label="访问密码" name="password" >
              <a-input v-model:value="formState.password" placeholder="选填" style="width:100px"/>
            </a-form-item>
          </a-col>
          <a-col :span='2' v-if="fileList.length > 0 && formState.cover">
            <a-form-item name="cover">
            </a-form-item>
          </a-col>
          <a-col :span='2'>
            <a-form-item >
                <a-button  type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
          </a-col>

        </a-form>
      </a-row>

      <div class="vditor">
        <vditor ref="vditorRef" :inite-value="body"></vditor>
      </div>
      <InputModal   create label="标签" @okHandle='okHandle' :visible="tagsModalVisible"  :loading="loading" @hideModal="hideModal" />
    </a-card>
    <!--        <a-button type="primary" @click="test">tex</a-button>-->
  </div>
</template>

<script>
  import {defineComponent, reactive, toRefs ,ref,getCurrentInstance,nextTick,provide,toRaw} from 'vue'
  import {useRoute,useRouter} from 'vue-router'
  import InputModal from '@/components/AntdCompent/InputModal.vue'
  import vditor from "@/components/vditor/vditor.vue";
  export default defineComponent({
    name: "Publish",
    props: {},
    setup() {
      const { proxy } = getCurrentInstance();
      const route = useRoute()
      const router = useRouter()
      const fileList = ref([]);
      const uploading = ref(false);
      let vditorRef = ref(null);
      let body = ref("");
      let formRef =ref(null)
      let initData = reactive({
        classifyList:[],
        tagsModalVisible:false,
        loading:false,
        tagsList:[],
        tagsValue:[],
      });
      let path = reactive({
        pathList:[{
          label:'/article_cover',value:'/article_cover'
        },{
          label:'/article_img',value:'/article_img'
        }],
        value:'/article_cover'
      })
      //获取编辑数据

      let initValue = route.params.text || ""
      if (initValue){
        initValue=JSON.parse(initValue)
        initValue.tags = initValue?.tags?.split(',')
      }
      const formState = reactive({
        ...initValue,
        password:''
      });
      if(initValue) body.value=initValue.body

      /**
       * 获取文章分类列表
       * @returns {Promise<void>}
       */
      const getClassify  = async () => {
        const {result=[],success,total=0} = await proxy.$api.getQueryAPI('categorize')
        if (success){
          initData.classifyList = [...result.rows]
        }
      }
      /**
       * 获取标签列表
       * @returns {Promise<void>}
       */
      const getTags  = async () => {
        const {result=[],success} = await proxy.$api.getQueryAPI('tags')
        if (success){
          initData.tagsList = [...result.rows]

        }
      }
      /**
       *添加tags
       * */
      const saveTags = async (value) => {
        initData.loading = true
        const { result , success ,message } = await proxy.$api.saveAPI('tags',{value})
        initData.loading = false
        if(success){
          getTags()
          proxy.$message.success(message)
        }

      }
      /**
       * modal事件 显示和确定
       * @param v
       */
      const okHandle = (v) =>{
        initData.tagsModalVisible = false
        saveTags(v)
      }
      const hideModal  = () => {
        initData.tagsModalVisible = false
      }
      const showInputModal = () =>{
        initData.tagsModalVisible = true
      }

      const onFinish = (value) =>{
        send(value)
        // formRef.value.resetFields()
      }
      const tagsChange = (v,o)=>{
        console.log(v);
        formState.tags = v
      }
      const send =async value=>{
        vditorRef.value.getValue()//获取markdown数据
        body.value = vditorRef.value.body//拿出获取markdown数据来
        value.tags = value.tags.join(',')
        value.auth = '2'
        if(initValue){
          const { result , success ,message } =  await proxy.$api.modifyAPI('article',{
            id:initValue.id,
            body:body.value,
            ...value
          })
          if(success){
            proxy.$message.success(message)
          }
          return
        }
        const { result , success ,message } = await proxy.$api.saveAPI('article',{
          body:body.value,
          likeList:'',
          ...toRaw(value)
        })
        if(success){
          proxy.$message.success(message)
        }
        router.push({
          path:'/detail',
          query:{id:result.id,body:result.password?1:0}
        })

      }
      const handleRemove = file => {
        const index = fileList.value.indexOf(file);
        const newFileList = fileList.value.slice();
        newFileList.splice(index, 1);
        fileList.value = newFileList;
      };
      const beforeUpload = file => {
        fileList.value = [...fileList.value, file];
        return false;
      };
      //上传文件
      const handleUpload = () => {
        uploading.value = true; // You can use any AJAX library you like
        proxy.$api.upload({file:fileList.value[0],name:fileList.value[0].name},).then(res=>{
          console.log(res);
          formState.cover = res
          uploading.value=false
        })
      };
      function handleChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          proxy.$message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          proxy.$message.error(`${info.file.name} file upload failed.`);
        }
      }
      const copyImgSrc  = () => {
        // const input = document.createElement('input');
        // document.body.appendChild(input);
        // input.setAttribute('value', formState.cover);
        // input.select();
        // if (document.execCommand('copy')) {
        //   document.execCommand('copy');
        //   proxy.$message.info('复制图片链接成功')
        // }
        var range = document.createRange();
        range.selectNode(document.getElementById('copyimg'));
        window.getSelection().addRange(range);
        document.execCommand("Copy");
      }

      const initFn  = () => {
        getClassify()
        getTags()
      }
      initFn()
      return {
        ...toRefs(initData),
        path,
        formState,
        onFinish,
        vditorRef,
        formRef,hideModal,copyImgSrc,
        body,tagsChange,okHandle,showInputModal,
        fileList,
        uploading,
        handleRemove,
        beforeUpload,
        handleUpload,
        handleChange
      };
    },
    components: {
      InputModal,
      vditor,
      VNodes: (_, {
        attrs,
      }) => {
        return attrs.vnodes;
      },
    },
  })
</script>

<style scoped lang='less'>
</style>
