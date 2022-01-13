<template>
 <div>
    <a-modal
      v-model:visible="visible"
      title="Modal"
      ok-text="确认"
      cancel-text="取消"
      @ok="hideModal"
			:confirmLoading='confirmLoading'
    >
			<a-form :model="formState" >
				<a-form-item label="Activity name">
					<a-input v-model:value="formState.name" />
				</a-form-item>
			</a-form>

		</a-modal>
 </div>
</template>

<script>
import {defineComponent, reactive, toRefs,createVNode,ref,getCurrentInstance,inject } from 'vue'

export default defineComponent({
	name: 'CommonModal',
	props: {
		dbName:{
			type:String,
			default:null
		},
		oldData:{
			type:[Object,Array],
			default:{}
		},
		id:[String],
		action:{
			type:String,
			default:'set'
		},
		field:{
			type:String,
			default:'tags'
		},
		visible:Boolean
	},
	setup(props,{emit}) {
		const {proxy} = getCurrentInstance()
		const confirmLoading = ref(false)
    const visible = ref(props.visible);
		const formState = reactive({
			name:'',
		})
		console.log(props.oldData);
		let sentdata = ref([...props.oldData])
		const handleChange = async (dbName,params,_id) => {
			confirmLoading.value=true
			const data = await proxy.$api.set(dbName,{
				[props.field]:params,
				_id
			})
			emit("ok")
			confirmLoading.value=false
		}
    const showHandle = () => {
			emit('showHandle')
      visible.value = true;
    };
    const hideModal = () => {
			if(Array.isArray(sentdata.value)){
				sentdata.value.push({value:formState.name,label:formState.name})
			}
		  handleChange(props.dbName,sentdata.value,props.id)
      visible.value = false;
    };
		inject('showHandle')


    return {
      visible,
      showModal,
      hideModal,
			formState,
			sentdata,
			showHandle
    };
  },
	components: {
		
	},
})
</script>

<style scoped lang='less'>
	
</style>