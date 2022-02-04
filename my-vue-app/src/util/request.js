import axios from 'axios'
import config from "./config";
import {notification} from 'ant-design-vue';
import {useStore} from 'vuex'
import {useRouter,useRoute} from 'vue-router'
import {message} from 'ant-design-vue';

const  { api_base_url ,ErrorMesage,Authentication} = config
import {API} from '@/util/api.js'

// axios.defaults.withCredentials =true
export function request (config){
 return new Promise((resolve, reject)=>{
    const instance = axios.create({
        baseURL:api_base_url,
        timeout:10000*3,
        method:"get"
    })
     const router = useRouter()
     const route = useRoute()
    instance.interceptors.request.use(config => {
      let token = localStorage.getItem('UMEP_BLOG')
      config.headers['Authorization'] =  `Bearer ${token}`;
  
      return config;
    }, error => {  //请求错误处理
        console.log(error);
    });

instance.interceptors.response.use(
  response => {  //成功请求到数据
      //这里根据后端提供的数据进行对应的处理
    if (!response.data.success) {
      message.error(response.data.message)
    }
    if(response.status==200) return response
  },
  error => {
      //响应错误处理
      if(JSON.parse(JSON.stringify(error)).status==400){
      
      }
  })
  instance(config)
      .then(res => {
        console.log(res.data)
          resolve(res.data)
      })
      .catch(err => {
          reject(err)
      })
 })
}