<template>
    <div class="Publish">
        <a-card>

            <a-row  style="height:80px;" justify="end">
                <a-form
                    :model="formState"
                    name="basic"
                    autocomplete="off"
                    @finish="onFinish"
                    ref="formRef"
                    layout="inline"
                    @finishFailed="onFinishFailed"
                >
                    <a-col :span='6'>
                    <a-form-item name="categorize" label="分类" :rules="[{ required: true, message: 'Please input your categorize!' }]">
                        <a-select
                            ref="select"
                            v-model:value="formState.categorize"
                            style="width: 120px"
                            placeholder="请选择分类"
                        >
                            <a-select-option v-for="(item,index) in data.categorizeList" :value="item.title" :key="item._id">{{item.title}}</a-select-option>
                        </a-select>
                    </a-form-item>
                    </a-col>
                    <a-col :span='8'>

                    <a-form-item name="tags" label="标签" :rules="[{ required: true, message: 'Please input your tags!' }]">
                        <a-select
                            :options="data.tagsObj.list"
                            mode="multiple"
                            placeholder="Please select"
                            style="width: 200px"
                            v-model:value="formState.tags"
                            @change='tagsChange'
                        >
                        <template #dropdownRender="{ menuNode: menu }">
                            <v-nodes :vnodes="menu" />
                            <a-divider style="margin: 4px 0" />
                            <div
                                style="padding: 4px 8px; cursor: pointer"
                                @mousedown="e => e.preventDefault()"
                                @click="showHandle"
                            >
                                <plus-outlined />
                                添加标签
                            </div>
                        </template>
                        </a-select>
                    </a-form-item>
                    </a-col>
                    <a-col :span='8'>
                    <a-form-item name="title" label="标题" :rules="[{ required: true, message: '添加标题' }]">
                        <a-input style="width: 200px" v-model:value="formState.title" placeholder="Basic usage" />
                    </a-form-item>
                    </a-col>
										<a-col :span='8'>
											<a-form-item name="describe" label="描述" :rules="[{ required: true, message: '添加描述' }]">
													<a-input style="width: 200px" v-model:value="formState.describe" placeholder="Basic describe" />
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
				<CommonModal  ref='modalRef' @ok='okHandle' dbName='classify'  :oldData='data.tagsObj.list' :id='data.tagsObj._id'  />	

        </a-card>
<!--        <a-button type="primary" @click="test">tex</a-button>-->
    </div>
</template>

<script>
import {defineComponent, reactive, toRefs ,ref,getCurrentInstance,nextTick,provide} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import CommonModal from '@/components/AntdCompent/CommonModal.vue'
import vditor from "@/components/vditor/vditor.vue";
export default defineComponent({
    name: "Publish",
    props: {},
    setup() {
			const { proxy } = getCurrentInstance();
			const route = useRoute()
			const router = useRouter()
			let vditorRef = ref(null);
			let body = ref("");
			let formRef =ref(null)
			let modalRef =ref(null)
			let data = reactive({
					categorizeList:[],
					tagsObj:{
						_id:"",
						list:[]
					},
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
			const getClassify = ()=>{
				proxy.$api.getList('classify').then(res=>{
					data.tagsObj._id = res.data[0]._id
					data.tagsObj.list = res.data[0].tags
				})
			}
			const  test = ()=>{}
			const onFinish = (value) =>{
					send(value)
					// formRef.value.resetFields()
			}
			const tagsChange = (v,o)=>{
					console.log(v);
			}
			const send =async value=>{
					//获取markdown数据
					vditorRef.value.getValue()
					body.value = vditorRef.value.body
					const auth = 'yuanzhiwen'
					if(initValue){
							let data =  await proxy.$api.update('article',{
							_id:initValue._id,
							body:body.value,
							...value
							})
							console.log(data)
							return
					}
					const data = await proxy.$api.add('article',{
							auth,
							body:body.value,
							like:0,
							look:0,
							...value
					})
					console.log(data);
					router.push({
							path:'/detail',
							query:{id:data.id}
					})
					
			}
			const okHandle = (v) =>{
				getClassify()
			}
			const showHandle = () =>{
				console.log(modalRef);
				modalRef.value.showHandle()
			}
			getClassify()
			return {
					test,
					data,
					formState,
					onFinish,
					vditorRef,
					formRef,modalRef,
					body,tagsChange,okHandle,showHandle
			};
    },
    components: {
			CommonModal,
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