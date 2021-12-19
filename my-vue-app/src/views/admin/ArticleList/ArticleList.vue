<template>
    <div class="AdminArticleList">
        <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
        <a-table bordered :data-source="data" :columns="columns">
            <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'name'">
                    <div class="editable-cell">
                        <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                            <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)" />
                            <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
                        </div>
                        <div v-else class="editable-cell-text-wrapper">
                            {{ text || ' ' }}
                            <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
                        </div>
                    </div>
                </template>
                <template v-else-if="column.dataIndex === 'operation'">
                    <a-popconfirm
                            v-if="dataSource.length"
                            title="Sure to delete?"
                            @confirm="onDelete(record.key)"
                    >
                        <a>Delete</a>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script>
    import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
    import {defineComponent, reactive, toRefs,} from 'vue'
    import {columns} from "@/views/admin/ArticleList/columns";

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    export default defineComponent({
        name: "ArticleList",
        data(){
            return{
                clazz:'ArticleList',
                title:'所有文章',
            }
        },
        props: {},
        setup(){
            return{
                data,
                columns,
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