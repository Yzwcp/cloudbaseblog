<template>
    <div class="Publish">
        <a-card>
            <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
                @finish="onFinish"
                ref="formRef"
                @finishFailed="onFinishFailed"
            >
                <a-form-item name="categorize">
                    <a-select
                            ref="select"
                            v-model:value="formState.categorize"
                            style="width: 120px"
                            placeholder="请选择分类"
                    >
                        <a-select-option v-for="(item,index) in data.categorizeList" :value="item.title" :key="item._id">{{item.title}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="tags">
                    <a-select
                            :options="data.tagsList"
                            mode="tags"
                            placeholder="Please select"
                            style="width: 200px"
                            v-model:value="formState.tags"
                    ></a-select>
                </a-form-item>
                <a-form-item name="title">
                    <a-input style="width: 200px" v-model:value="formState.title" placeholder="Basic usage" />
                </a-form-item>
                <a-form-item >
                    <a-button type="primary" html-type="submit">Submit</a-button>
                </a-form-item>
                <vditor ref="vditorRef" :inite-value="body"></vditor>
            </a-form>
        </a-card>
<!--        <a-button type="primary" @click="test">tex</a-button>-->

    </div>
</template>

<script>
    import {defineComponent, reactive, toRefs ,ref,getCurrentInstance,nextTick} from 'vue'
    import {useRoute} from 'vue-router'
    import vditor from "@/components/vditor/vditor.vue";
    export default defineComponent({
        name: "Publish",
        props: {},
        setup() {
            const { proxy } = getCurrentInstance();
            const route = useRoute()
            let vditorRef = ref(null);
            let body = ref('hello, Vditor  Vue!');
            let formRef =ref(null)
            let data = reactive({
                categorizeList:[],
                tagsList:[],
                tagsValue:[],
            });

            //获取编辑数据
            let initValue = route.params.text || ""
            initValue && (initValue=JSON.parse(initValue))
            const formState = reactive({
                ...initValue
            });
            if(initValue) body.value=initValue.body
            //获取文章分类列表
            proxy.$api.getList('categorize').then(res=>{
                data.categorizeList=[...res.data]
            })
            //获取文章标签列表
            proxy.$api.getList('classify').then(res=>{
                data.tagsList=[...res.data[0].tags]
            })
            const  test = ()=>{}
            const onFinish = (value) =>{
                send(value)
                formRef.value.resetFields()
            }
            const send =async value=>{
                //获取markdown数据
                vditorRef.value.getHTML()
                body.value = vditorRef.value.body
                const auth = 'yuanzhiwen'
                let createTime  = new Date()
                proxy.$api.set('article',{
                    auth,
                    body:body.value,
                    createTime,
                    updataTime:createTime,
                    like:0,
                    look:0,
                    ...value
                }).then(res=>{
                    console.log(res)
                })
            }
            return {
                test,
                data,
                formState,
                onFinish,
                vditorRef,
                formRef,
                body
            };
        },
        components: {vditor},
    })
</script>

<style scoped lang='less'>
</style>