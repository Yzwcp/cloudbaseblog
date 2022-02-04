<template>
    <div class="AdminArticleList">

        <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
        <a-table rowKey="_id" bordered :data-source="data.dataSource" :columns="columns"  :pagination='pagination' @change='changeCurrent' :loading="loading">
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
        let data = reactive({
            dataSource:[]
        })
        const getArticle  = async () => {
          const { result , success } = await proxy.$api.getQueryAPI('article')
          data.dataSource = [...result]
        }
        const pagination = computed(() => ({
            total: total.value,
            current: current.value,
            pageSize: limit,
        }));
        const handEdit = (text)=>{
            router.push({
                //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
                name: 'adminPublish',
                params: {
                    text:JSON.stringify(text)
                }
            });
        }
        const changeCurrent = (v) =>{
            console.log( v);
            current.value =v.current
            initList()
        }
        getArticle()
        return{
            data,
            columns,
            dayjs,
            changeCurrent,
            handEdit,
            pagination,
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