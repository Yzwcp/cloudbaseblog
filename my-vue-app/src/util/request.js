import axios from 'axios'
import config from "./config";
import {notification} from 'ant-design-vue';
const  { api_base_url ,ErrorMesage} =config
axios.defaults.withCredentials =true
export function request (config){
 return new Promise((resolve, reject)=>{
     const instance = axios.create({
         baseURL:api_base_url,
         timeout:10000*3,
         method:"POST"
     })
     instance.interceptors.request.use(config => {
      // app.$vux.loading.show({
      //     text: '数据加载中……'
      // });
      // console.log(config);
      // config.method === 'post'
      //     ? config.data = JSON.stringify({...config.data})
      //     : config.params = {...config.params};
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      return config;
  }, error => {  //请求错误处理
      // app.$vux.toast.show({
      //     type: 'warn',
      //     text: error
      // });
      console.log(error);
      // Promise.reject(error)
  });

instance.interceptors.response.use(
  response => {  //成功请求到数据
      //这里根据后端提供的数据进行对应的处理
      // console.log(response);
      if(response.status==200) return response
      notification.error({message:"["+response.status+"]"+response.data.code,description:"接口请求成功数据返回失败"})
  },
  error => {  
      //响应错误处理
      // console.log(error.response);
      notification.error({message:"["+JSON.parse(JSON.stringify(error)).status+"]"+ ErrorMesage[JSON.parse(JSON.stringify(error)).status]+error.response.data.code,description:error.response.data.message})
  })
  instance(config)
      .then(res => {
          resolve(res.data)
      })
      .catch(err => {
          reject(err)
      })
 })
}