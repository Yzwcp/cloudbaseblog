<template>
    <div class="Categorize">

        <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="showModal">Add</a-button>
        <a-table bordered :data-source="data.dataSource" :columns="columns">
                <template v-if="column.dataIndex === 'updataTime'">
                    {{dayjs(new Date(text)).format('YYYY-MM-DD HH:mm:ss')}}
                </template>
                <template v-if="column.dataIndex === 'createTime'">
                    {{dayjs(new Date(text)).format('YYYY-MM-DD HH:mm:ss')}}
                </template>
								<template #operation="{ record , text }">
										<a-popconfirm
                            @confirm="onDelete(record.key)"
                    >
                        <a>Delete</a>
                    </a-popconfirm>
                    <a-divider type="vertical" />
                    <a @click="showModal(text)">编辑</a>
								</template>
        </a-table>
        <a-modal v-model:visible="visible" title="修改分类" @ok="handleOk">
            <a-input v-model:value="data.record.title"></a-input>
        </a-modal>
    </div>
</template>

<script>
  import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
  import {defineComponent,ref, reactive, toRefs,getCurrentInstance} from 'vue'
  import {columns} from "@/views/admin/Categorize/columns";
  import dayjs from "dayjs";
  import {useRouter} from 'vue-router'
  export default defineComponent({
    name: "Categorize",
    data(){
      return{
        clazz:'Categorize',
        title:'所有文章',
      }
    },
    props: {},

    setup(props,{emit}){
      const {proxy}=getCurrentInstance()
      const router = useRouter()
      let data = reactive({
        dataSource:[],
        record:{}
      })

      const init =()=>{
        proxy.$api.getList('categorize').then(res=>{
          data.dataSource= ([...res.data])
        })
      }
      init()
      const visible = ref(false);
      const showModal = (v) => {
        data.record = { ...v }
        visible.value = true;
      };
      const handleOk = async ()=>{
        if(!data.record._id){
          await proxy.$api.add('categorize',{
            title: data.record.title,
          })
        }else{
          await proxy.$api.update('categorize',{
            _id:data.record._id,
            title: data.record.title,
          })
        }

        init()
        visible.value = false;
      }
      return{
        data,
        columns,
        dayjs,
        showModal,
        visible,
        handleOk
      }
    },
    methods:{
      handleAdd(){
        this.$router.push('/admin/publish')
      },
    },
    components: {
      SmileOutlined,
      DownOutlined,
    },
  })
</script>

<style scoped lang='less'>

</style>