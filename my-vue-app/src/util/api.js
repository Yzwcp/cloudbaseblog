import cloudbase from '@cloudbase/js-sdk'
import tcb from '@cloudbase/js-sdk'
export const appCloud = cloudbase.init({
    env: "hello-cloudbase-0g324hb6bc21523c"
});
export const db = appCloud.database() ;
export const auth = appCloud.auth({persistence: "local"})
export const API = {
    db,
    auth,
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
    set:(dbName,params)=>{
            return new Promise((resolve, reject)=>{
                db.collection(dbName)
                .add({...params})
                .then(res=>{
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            })
    }
}



