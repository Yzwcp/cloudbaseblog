<template>
    <div class="Login">
        <div class="login-card">
<!--            <transition-->
<!--              @before-enter="beforeEnter"-->
<!--              v-on:enter="enter"-->
<!--              v-on:after-enter="afterEnter">-->
<!--                -->
<!--            </transition>-->
            <div class="loginBlock" >
                <div style="width: 200px;text-align: center;">{{!isLogin?"去注册":'去登录'}}</div>
                <div @click="change"  style="cursor: pointer;margin-top: 10px">
                    <RightCircleOutlined v-if="!isLogin"/>
                    <LeftCircleOutlined v-else/>
                </div>
            </div>
            <a-form
              :model="formState"
              name="basic"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 10 }"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
              class="form"
            >
                <a-form-item
                  label="邮箱"
                  name="email"
                  :rules="[{ required: true, message: 'Please input your email!' }]"
                >
                    <a-input v-model:value="formState.email" />
                </a-form-item>

                <a-form-item
                  label="密码"
                  name="password"
                  :rules="[{ required: true, message: 'Please input your password!' }]"
                >
                    <a-input-password  v-model:value="formState.password" />
                </a-form-item>

            </a-form>
<!--            <div class="register">-->
<!--                <div>注册</div>-->
<!--                <LeftCircleOutlined />-->
<!--                </div>-->
            <div class="footer">
                <div v-if="!isLogin" class="loginBtn" @click="onFinish">登录</div>
                <div class="loginBtn" v-else @click="onRegister">注册</div>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent, getCurrentInstance, reactive, toRefs,ref} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import { RightCircleOutlined,LeftCircleOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    name: "Login",
    props: {},
    setup(){
        const { proxy } = getCurrentInstance();
        const router = useRouter()
        const store = useStore()
        const isLogin = ref(false)
        const formState = reactive({
            email: '',
            password: '',
            remember: true,
        });
        // console.log(proxy.$api.auth.getAuthHeader());
        const onRegister =async (values) => {
          const data =   await proxy.$api.register({...values})
          console.log(data)
          if(data.success){
            localStorage.setItem('UMEP_BLOG',data.token)
            proxy.$message.success('注册成功')
          }
        };
        const change = (v)=>{
            isLogin.value =!isLogin.value
            let loginBlock = document.querySelector('.loginBlock')
            const registerStyle = 'color:white;' +
              'transition:all 1s ease;left:600px;' +
              'border-top-right-radius: 20px;' +
              'border-bottom-right-radius: 20px;'+
              'border-top-left-radius: 0px;' +
              'border-bottom-left-radius: 0px;'
            const loginStyle = 'color:white;' +
              'transition:all 1s ease;left:0;' +
              'border-top-right-radius: 0px;' +
              'border-bottom-right-radius: 0px;'+
              'border-top-left-radius: 20px;' +
              'border-bottom-left-radius: 20px;'
            if(isLogin.value){
                loginBlock.style = registerStyle
            }else{
                loginBlock.style = loginStyle
            }


        }
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
        const beforeEnter =(el)=>{
            console.log(el)
            el.style.left = '0'
            el.style.transition = 'all 2s ease'
        }
        const enter =(el,done)=>{
            // 动画指定的过程
            // 作用：告诉浏览器重绘或重排页面结构
            // offsetWidth 会通知浏览器重新计算元素的宽度，这样，会造成浏览器重绘
            // el.offsetWidth
            // el.offsetHeight
            el.offsetHeight
            // 设置动画要达到的目标状态
            el.style.left = '600px'
            done()
        }
        const afterEnter =(el)=>{

        }
        return {
            formState,
            onFinish,
            onFinishFailed,
            beforeEnter,
            enter,isLogin,
            afterEnter,change,onRegister
        };
    },
    components: {RightCircleOutlined,LeftCircleOutlined},
})
</script>

<style scoped lang='less'>

    .donghua(@DHname){
        @keyframes @DHname {
            0%{
                background-color:red;
            }
            50%{
                background-color: green;
            }
            100%{
                background-color: blue;
            }
        }
    };

    /* 调用定义的动画（传入实参name）*/
    .donghua(myDongHua); // 名称

    /*
    1、定义动画属性 （动画有6条默认的属性，详情可访问https://www.w3school.com.cn/cssref/pr_animation.asp）
    2、@animation-name,@animation-duration,@animation-timing-function,@animation-delay,@play-state,@animation-iteration-count
    3、此处只需引入你需要的属性，不需要的不能引入，否则会报错
    */
    .animation(@animation-name,@animation-duration,@animation-timing-function){
        animation: @arguments;
    }

    .Login{
        width: 100%;
        position: absolute;
        height: 100%;
        background: url("/src/assets/login-bg.jpg") no-repeat ;
        background-size: 100% 100%;
        .login-card{
            box-shadow: -1px -2px 4px #28364d;
            background: white;
            width: 800px;
            height:400px;
            border-radius: 20px;
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            .form{
                position: absolute;
                left: 200px;
                width: 400px;
            }
            .loginBlock{
                border-top-left-radius: 20px;
                border-bottom-left-radius: 20px;
                box-shadow: -1px -2px 4px black;
                position: absolute;
                left: 0;
                height: 100%;
                background: #396EB0;
                width: 200px;
                text-align: center;
                padding: 150px 10px;
                font-size: 34px;
                color: white;
                //.animation(myDongHua,5s,infinite); // 1|动画名 2|动画时间 3|播放函数(比如：循环等)
            }
            .register{
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
                position: absolute;
                right: 0;
                height: 100%;
                background: #396EB0;
                width: 200px;
                text-align: center;
                padding: 50px;
                font-size: 34px;
                color: white;
            }
            .footer{
                position: absolute;
                z-index: 2;
                width: 100%;
                background: #396EB0;
                height: 50px;
                bottom: 0;
                border-bottom-right-radius: 20px;
                border-bottom-left-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .loginBtn{
                    line-height: 50px;
                    background: #FC997C ;
                    color: white;
                    width: 100px;
                    border-bottom-right-radius: 20px;
                    cursor: pointer;
                    text-align: center;
                }
            }
        }
    }
</style>
