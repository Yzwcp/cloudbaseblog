import axios from 'axios'
import config from "./config";
import {notification} from 'ant-design-vue';
import {useStore} from 'vuex'
import router from "@/router";
import {message} from 'ant-design-vue';

const  { api_base_url ,ErrorMesage,Authentication} = config
import {API} from '@/util/api.js'
// axios.defaults.withCredentials =true
const error = (error) => {
  //
  let response = JSON.parse(JSON.stringify(error.response))
  if(response){
    if(response.status===401){
      message.error(response.data)
      router.push('/login')
    }
  }
  // if(!error.status){
  //   notification.error({description:err.message,message:err.name})
  // }
}
export function request (config){
 return new Promise((resolve, reject)=>{
    const instance = axios.create({
        baseURL:api_base_url,
        timeout:10000*3,
        method:"get"
    })

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
    // console.log(response)
    if (!response.data.success) {
      return  message.error(response.data.message)
    }
    if(response.status==200) return response
  },
  error )
  instance(config)
      .then(res => {
          resolve(res?.data || {})
      })
      .catch(err => {
          reject(err)
      })
 })
}
