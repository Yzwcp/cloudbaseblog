<template>
 <div>
    <a-modal
      v-model:visible="initData.visible"
      :title="initData.create?'创建':'修改'"
      ok-text="确认"
      cancel-text="取消"
      @ok="okHandle"
      @cancel="hideModal"
			:confirmLoading='initData.loading'
      :zIndex="2000"
    >
			<a-form :model="initData" ref="formRef">
				<a-form-item :label="label" name="value"  :rules="[{ required: true, message: '请输入' + label }]">
					<a-input  v-model:value="initData.value" />
				</a-form-item>
			</a-form>

		</a-modal>
 </div>
</template>

<script>
import {defineComponent, reactive, toRefs,createVNode,ref,getCurrentInstance,inject ,watchEffect} from 'vue'

export default defineComponent({
	name: 'InputModal',
	props: {
    visible:[Boolean],
    loading:[Boolean],
    label:[String],
    create:[Boolean]
	},
	setup(props,{emit,expose }) {
	  const {visible=false,loading=false,label='',create=true} =toRefs(props)
    const formRef = ref();
    const initData = reactive({
      visible:visible,
      loading:loading,
      value:'',
      label:label,
      create,
    })
    const hideModal = () => {
      emit('hideModal')
      formRef.value.resetFields();
    };
    const okHandle = () => {
      formRef.value
      .validate()
      .then(() => {
        emit('okHandle',initData.value)
        formRef.value.resetFields();
      })
      .catch(error => {
        console.log('error', error);
      });
    };
    return {
      initData,
      hideModal,
      okHandle,
      formRef,
    };
  },
	methods(){
	
	},
	components: {
		
	},
})
</script>

<style scoped lang='less'>
	
</style>