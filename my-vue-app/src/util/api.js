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
    /**
    * 获取表列表
    * @params  dbname 表名
    * */
    getList:(dbName,page={skip:0,limit:999},where={},orderBy)=> {
      return  request({url:'/getCollection',data:{dbName,page,where,orderBy}})
    },
    /**
    * 获取表列表总数
    * @params  dbname 表名
    * */
     getCount:(dbName)=>{
        return new Promise((resolve, reject)=>{
            db.collection(dbName)
            .limit(99)
            .count()
            .then(res=>{
                resolve(res)
            })
        })
    },
    /**
     * 创建记录
     * @params dbname 表名
     * @params params 参数
     * */
    set:(dbName,params)=>{
        return new Promise((resolve, reject)=>{
						let id = params._id
            if(params._id) delete params._id
            db.collection(dbName)
						.doc(id)
            .set({...params,updataTime:time,createTime:time})
            .then(res=>{
                resolve(res)
                message.success('添加成功!')
            }).catch(err=>{
                reject(err)
            })
        })
    },
		add:(dbName,params)=>{
        return new Promise((resolve, reject)=>{
            db.collection(dbName)
            .add({...params,updataTime:time,createTime:time})
            .then(res=>{
                resolve(res)
                message.success('添加成功!')
            }).catch(err=>{
                reject(err)
            })
        })
    },
    /**
     * 更新记录
     * @params dbname 表名
     * @params params 参数
     * */
    update:(dbName,params)=>{
        return new Promise((resolve, reject)=>{
            let id = params._id
            if(params._id) delete params._id
            db.collection(dbName)
              .doc(id)
              .update({...params,updataTime:time})
              .then(res=>{
                  resolve(res)
                  message.success('修改成功')
              }).catch(err=>{
                  reject(err)
                  message.success('修改失败')
            })
        })
    },
    /**
     * 获取单条
     * @params dbname 表名
     * @params params 参数
     * */
    getDetail:(dbName,params)=>{
        return new Promise((resolve, reject)=>{
            let id = params._id
            if(params._id) delete params._id
            db.collection(dbName)
              .where({_id:id})
              .get()
              .then(res=>{
                  resolve(res)
              }).catch(err=>{
                reject(err)
                message.success('获取失败')
            })
        })
    },
    /**
     * 上传文件
     * 
     * 
     */
    uploadOss(file,fileName){
        return new Promise((resolve,reject)=>{
            const time = new Date().getTime()
            client.put('blog/'+time+"_"+fileName,file,{
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



