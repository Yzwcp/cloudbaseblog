<template>
    <div class="Login">
        <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 6 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
        >
            <a-form-item
                    label="Username"
                    name="email"
                    :rules="[{ required: true, message: 'Please input your email!' }]"
            >
                <a-input v-model:value="formState.email" />
            </a-form-item>

            <a-form-item
                    label="Password"
                    name="password"
                    :rules="[{ required: true, message: 'Please input your password!' }]"
            >
                <a-input-password v-model:value="formState.password" />
            </a-form-item>

            <a-form-item name="remember" :wrapper-col="{ span: 6 }">
                <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
            </a-form-item>

            <a-form-item :wrapper-col="{  span: 6 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
    import {defineComponent, getCurrentInstance, reactive, toRefs,} from 'vue'
    import {useRouter} from 'vue-router'
    import {useStore} from 'vuex'
    export default defineComponent({
        name: "Login",
        props: {},
        setup(){
            const { proxy } = getCurrentInstance();
            const router = useRouter()
            const store = useStore()
            const formState = reactive({
                email: '',
                password: '',
                remember: true,
            });
            // console.log(proxy.$api.auth.getAuthHeader());
            // const onFinish =async (values) => {
            //   const data =   await proxy.$api.register({...values})
            //   console.log(data)
            //   if(data.success){
            //     localStorage.setItem('UMEP_BLOG',data.token)
            //     proxy.$message.success('注册成功')
            //   }
            // };
            const onFinish =async (values) => {
                const {result,message,success} =   await proxy.$api.login({...values})
                if(success){
                    localStorage.setItem('UMEP_BLOG',message)
                    router.push({path:'admin'})
                    proxy.$message.success('登录成功')
                }
            };
            const onFinishFailed = (errorInfo) => {
                console.log('Failed:', errorInfo);
            };
            return {
                formState,
                onFinish,
                onFinishFailed,
            };
        },
        components: {},
    })
</script>

<style scoped lang='less'>
</style>
