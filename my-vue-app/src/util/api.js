
import {request} from './request'
export const API = {
  register:(value)=>{
    return request({url:'/register',method:'post',data:{...value}})
  },
  login:(value)=>{
    return request({url:'/login',method:'post',data:{...value}})
  },
  upload:(value)=>{
      return request({url:'/upload',method:'post',data:{...value}})
  },
  getQueryAPI:(clazz,value)=>{
    return request({url:clazz+'/query',method:'get',params:{...value}})
  },
  saveAPI:(clazz,value)=>{
    return request({url:clazz+'/save',method:'post',data:{...value}})
  },
  modifyAPI:(clazz,value)=>{
    return request({url:clazz+'/modify',method:'post',data:{...value}})
  },
  removeAPI:(clazz,value)=>{
    return request({url:clazz+'/remove',method:'post',data:{...value}})
  },
  detailAPI:(clazz,value)=>{
    return request({url:clazz+'/detail',method:'post',data:{...value}})
  },
  commonSaveAPI:(clazz,value)=>{
    return request({url:'/common'+clazz+'/save',method:'post',data:{...value}})
  },
}



