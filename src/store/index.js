import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem,removeItem} from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:getItem('user'),//当前登录用户的登录状态(token等数据)
  },
  mutations: {
    setUser(state,data){
      state.user = data
      setItem('user',state.user)
     
    }
  },
  actions: {
  },
  modules: {
  }
})
