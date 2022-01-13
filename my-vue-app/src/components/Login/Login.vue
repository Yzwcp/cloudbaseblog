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
                    name="username"
                    :rules="[{ required: true, message: 'Please input your username!' }]"
            >
                <a-input v-model:value="formState.username" />
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
                username: '',
                password: '',
                remember: true,
            });
            // console.log(proxy.$api.auth.getAuthHeader());
            const onFinish = (values) => {
                // console.log('Success:', values);
                //注册
                // console.log( proxy.$api);
                // proxy.$api.auth.signUpWithEmailAndPassword(values.username, values.password)
                // .then((res) => {
                //     console.log(res)
                //     // router.push('/admin/publish')

                // });
                console.log( proxy.$api);
                proxy.$api.auth.signInWithEmailAndPassword(values.username, values.password)
                .then((res) => {
                    const user = proxy.$api.auth.currentUser;
                    //记录token
                    store.dispatch('authToken')
                    store.dispatch('emailUser',user)
                    router.push('/')
                });
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