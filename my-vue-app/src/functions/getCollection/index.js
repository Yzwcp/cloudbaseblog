const cloudbase = require("@cloudbase/node-sdk");

const appCloud = cloudbase.init({
    env: "hello-cloudbase-0g324hb6bc21523c"
});
const db = appCloud.database() ;
exports.main = async (event, context) => {
    const {body=null} = event
    if(body==null)return {data:false} 
    const { dbName, page={skip:0,limit:999},where={}} = JSON.parse(body)
    let result = await db.collection(dbName).limit(page.limit).skip(page.skip).where(where).get()
    return result
};
