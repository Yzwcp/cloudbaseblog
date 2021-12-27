import cloudbase from '@cloudbase/js-sdk'
import tcb from '@cloudbase/js-sdk'
import Antd,{message} from 'ant-design-vue';
export const appCloud = cloudbase.init({
    env: "hello-cloudbase-0g324hb6bc21523c"
});
export const db = appCloud.database() ;
export const auth = appCloud.auth({persistence: "local"})

let time  = new Date()
export const API = {
    db,
    auth,
    /**
    * 获取表列表
    * @params  dbname 表名
    * */
    getList:(dbName)=>{
        return new Promise((resolve, reject)=>{
            db.collection(dbName)
            .limit(999)
            .get()
            .then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
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
                db.collection(dbName)
                .add({...params,updataTime:time,createTime:time})
                .then(res=>{
                    resolve(res)
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
    }
}



