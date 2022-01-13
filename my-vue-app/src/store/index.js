import { createStore } from 'vuex'
import getters from './getters.js'
import {API} from '@/util/api.js'
export default createStore({
  state: {
    token:null,
    user:{},
  },
  mutations: {
    SET_TOKEN(state,token){
      state.token = token
    },
    SET_USER(state,user){
      state.user = {user}
    },
  },
  actions: {
    emailLogin({commit},token){commit('SET_TOKEN',token)},
    emailUser({commit},user){commit('SET_USER',user)},
    authToken({commit}){ 
      const authHeader = API.auth.getAuthHeader();
      console.log(11);
      if(authHeader['x-cloudbase-credentials'].length<20) return commit('SET_TOKEN',null)
      commit('SET_TOKEN',authHeader['x-cloudbase-credentials'])
    }
  },
  modules: {
  },
  getters
})
