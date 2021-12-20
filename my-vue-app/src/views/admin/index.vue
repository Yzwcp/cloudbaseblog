<template>
    <div class="index">
        <a-layout style="min-height: 100vh">
            <a-layout-sider v-model:collapsed="collapsed" collapsible>
                <div class="logo" />
                <a-menu :selectedKeys="[$route.meta.route]" theme="dark" mode="inline">
                    <a-menu-item key="/admin" >
                        <pie-chart-outlined />
                        <router-link  to="/admin"><span>首页</span></router-link>
                    </a-menu-item>
                    <a-menu-item key="/admin/article">
                        <desktop-outlined />
                        <router-link  to="/admin/article"><span>文章</span></router-link>
                    </a-menu-item>
                    <a-menu-item key="/admin/Categorize">
                        <desktop-outlined />
                        <router-link  to="/admin/Categorize"><span>分类</span></router-link>
                    </a-menu-item>
                    <a-menu-item key="/admin/Tags">
                        <desktop-outlined />
                        <router-link  to="/admin/Tags"><span>标签</span></router-link>
                    </a-menu-item>
                </a-menu>
            </a-layout-sider>
            <a-layout>
                <a-layout-header style="background: #fff; padding: 0" />
                <a-layout-content style="margin: 0 16px">
                    <a-breadcrumb style="margin: 16px 0">
                        <a-breadcrumb-item>{{$route.meta.title}}</a-breadcrumb-item>
                    </a-breadcrumb>
                   <router-view/>
                </a-layout-content>
                <a-layout-footer style="text-align: center">
                    Ant Design ©2018 Created by Ant UED
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
    import {PieChartOutlined,DesktopOutlined,UserOutlined,TeamOutlined,FileOutlined,} from '@ant-design/icons-vue';
    import ArticleList from "@/views/admin/ArticleList/ArticleList.vue";
    import {defineComponent, reactive, toRefs,ref} from 'vue'

    export default defineComponent({
        name: "index",
        props: {},
        data(){
            return {
                collapsed: ref(false),
                selectedKeys: ref([this.$route.meta.route]),
            };
        },
        components: {
            PieChartOutlined,
            DesktopOutlined,
            UserOutlined,
            TeamOutlined,
            FileOutlined,
        },
    })
</script>

<style scoped lang='less'>

</style>