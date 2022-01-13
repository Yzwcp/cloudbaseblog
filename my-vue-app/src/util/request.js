import axios from 'axios'
import config from "./config";
import {notification} from 'ant-design-vue';
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
const  { api_base_url ,ErrorMesage,Authentication} = config
import {API} from '@/util/api.js'

axios.defaults.withCredentials =true
export function request (config){
 return new Promise((resolve, reject)=>{
    const instance = axios.create({
        baseURL:api_base_url,
        timeout:10000*3,
        method:"POST"
    })
    const router = useRouter()  
    instance.interceptors.request.use(config => {
        const authHeader = API.auth.getAuthHeader();
        let token = authHeader['x-cloudbase-credentials']
        if(token.length<10 && Authentication) {
            notification.error({message:"请求失败",description:"还没有，请登录！",})
            router.push('/login')
            return
        }else{
            config.headers['x-cloudbase-credentials'] = token
        }
        return config;
    }, error => {  //请求错误处理
        console.log(error);
    });

instance.interceptors.response.use(
  response => {  //成功请求到数据
      //这里根据后端提供的数据进行对应的处理
      if(response.status==200) return response
      notification.error({message:"["+response.status+"]"+response.data.code,description:"接口请求成功数据返回失败"})
  },
  error => {  
      //响应错误处理
      if(JSON.parse(JSON.stringify(error)).status==400){
        notification.error({message:"token失效，请重新登录",description:error.response.data.message})
        router.push('/login')
      }
  })
  instance(config)
      .then(res => {
          console.log(res);
          resolve((res.data || res))
      })
      .catch(err => {
          reject(err)
      })
 })
}