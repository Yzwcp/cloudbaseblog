const env = import.meta.env
export default {
	api_base_url :env.VITE_API_BASE_URL,
  // api_base_url : 'httpz://hello-cloudbase-0g324hb6bc21523c-1307223249.ap-shanghai.app.tcloudbase.com',
  ErrorMesage:{
    400:'网络请求失败！'
  },
  Authentication:false,//是否开启全域访问鉴权


}
// 首页每页数量
export const HOME_LIMIT = 6
