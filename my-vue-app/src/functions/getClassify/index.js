'use strict';
const cloudbase = require("@cloudbase/node-sdk");
const appCloud = cloudbase.init({
    env: "hello-cloudbase-0g324hb6bc21523c"
});
const db = appCloud.database() ;
exports.main = async (event, context) => {
    let a = await db.collection('article').get()
    console.log("Hello World")
    console.log(a)
    console.log(event["non-exist"])
    return a
};
