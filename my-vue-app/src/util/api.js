import cloudbase from '@cloudbase/js-sdk'
import tcb from '@cloudbase/js-sdk'
import Antd,{message} from 'ant-design-vue';
import {client} from '@/util/aliOss.js'
import {request} from './request'
export const appCloud = cloudbase.init({
    env: "hello-cloudbase-0g324hb6bc21523c"
});
export const db = appCloud.database() ;
export const auth = appCloud.auth({persistence: "local"})

let time  = new Date()
export const API = {
    appCloud,
    db,
    auth,
    saveArticle:(value)=>{
      return request({url:'/saveArticle',method:'POST',data:{...value}})
    },
    editArticle:(value)=>{
      return request({url:'/editArticle',method:'POST',data:{...value}})
    },
    saveClassify:(value)=>{
      return request({url:'/saveClassify',params:{value}})
    },
    saveTags:(value)=>{
      return request({url:'/saveTags',params:{value}})
    },
    saveComment:(value)=>{
      return request({url:'/saveComment',method:'POST',data:{...value}})
    },
    getQueryAPI:(dbName,where,orderBy,limit,from)=>{
        return request({url:'/query',params:{dbName,where,orderBy,limit,from}})
    },
    saveCommonLikeAPI:(dbName,where,userLikeMd5)=>{
      return request({url:'/saveCommonLike',method:'post',data:{dbName,where,userLikeMd5}})
    },
    register:(value)=>{
      return request({url:'/register',method:'post',data:{...value}})
    },
    login:(value)=>{
      return request({url:'/login',method:'post',data:{...value}})
    },
    /**
     * 上传文件
     *
     *
     */
    uploadOss(path,file,fileName){
        return new Promise((resolve,reject)=>{
            const time = new Date().getTime()
            client.put(`blog${path}/${time}_${fileName}`,file,{
                headers: {'Content-Type': 'image/jpg' }
            })
            .then(function (r1) {
                if(r1.res.status==200) resolve(r1.url)
            })
            .catch(function (err) {
                console.log('error: %j', err);
                reject(err)
            });
        })
    },
}



