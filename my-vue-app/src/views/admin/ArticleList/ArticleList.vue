<template>
    <div class="AdminArticleList">

        <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
        <a-table bordered :data-source="data.dataSource" :columns="columns">
            <template #bodyCell="{ column, text }">
                <template v-if="column.dataIndex === 'tags'">
                    <a-tag v-for="tag in text" :key="tag" color="blue">{{ TAGSDICT[tag] }}</a-tag>
                </template>
                <template v-if="column.dataIndex === 'updataTime'">
                    {{dayjs(new Date(text)).format('YYYY-MM-DD HH:mm:ss')}}
                </template>
                <template v-if="column.dataIndex === 'createTime'">
                    {{dayjs(new Date(text)).format('YYYY-MM-DD HH:mm:ss')}}
                </template>
                <template v-if="column.key === 'operation'">
                    <a-popconfirm
                            @confirm="onDelete(record.key)"
                    >
                        <a>Delete</a>
                    </a-popconfirm>
                    <a-divider type="vertical" />
                    <a @click="handEdit(text)">编辑</a>
                </template>
            </template>
        </a-table>

    </div>
</template>

<script>
    import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
    import {defineComponent, reactive, toRefs,getCurrentInstance} from 'vue'
    import {columns} from "@/views/admin/ArticleList/columns";
    import {TAGSDICT} from '@/util/map.js'
    import dayjs from "dayjs";
    import {useRouter} from 'vue-router'
    export default defineComponent({
        name: "ArticleList",
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
            let data = reactive({
                dataSource:[]
            })
            proxy.$api.getList('article').then(res=>{
                console.log(res)
                data.dataSource= ([...res.data])
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
            return{
                data,
                columns,
                TAGSDICT,
                dayjs,
                handEdit
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