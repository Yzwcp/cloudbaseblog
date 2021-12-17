<template>
    <div class="ArticleItem">
        <div class="ArticleItem-container">
            <div class="container-title">基于Vue的跨移动端和PC端适应 - 掘金</div>
            <ul  class="container-msg">
                <span>vue</span>
                <span>react</span>
                <span class="container-time">2022-10-01</span>
                <span class="container-popular">999</span>
            </ul>
            <div class="container-content">
                Vue CLI 使用了一套基于插件的架构。如果你查阅一个新创建项目的 package.json，就会发现依赖都是以 @vue/cli-plugin- 开头的。插件可以修改 webpack 的内部配置，也可以向 vue-cli-service 注入命令。在项目创建的过程中，绝大部分列出的特性都是通过插件来实现的。
            </div>
            <div class="container-comein">
                <a href="javascript:;">全文阅读</a>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent, reactive, toRefs} from 'vue'

export default defineComponent({
    name: "ArticleItem",
    props: {},
    components: {},
})
</script>

<style scoped lang='less'>
    .ArticleItem{margin-bottom: 40px}
    .ArticleItem-container{
        box-shadow:  0px 0px 14px -10px @99-base-color ;
        padding: 20px;
        padding-bottom: 50px;
        border-radius: 10px;
        .container-title{
            font-weight: 600;
            font-size: 28px;
            color: @88-base-color;
        }
        .container-msg{
            span{
                margin-right: 20px;
                color: black;
                opacity: .5;
            }
        }
        .container-content{
            text-indent: 2em;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            margin-bottom: 20px;
        }
        .container-comein{
            float: right;
            font-size: 18px;
            a{color: #2E4C6D}
        }
    }
</style>