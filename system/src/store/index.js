import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //存储token
    Authorization:localStorage.getItem('Authorization')?localStorage.getItem('Authorization') : '',
    userName:localStorage.getItem('userName')?localStorage.getItem('userName'):'',
    userAvatar:localStorage.getItem('userAvatar')?localStorage.getItem('userAvatar'):'',
    userIdentity:localStorage.getItem('userIdentity')?localStorage.getItem('userIdentity'):'',
    rememberPhone:localStorage.getItem('rememberPhone')?localStorage.getItem('rememberPhone'):'',
    rememberPassword:localStorage.getItem('rememberPassword')?localStorage.getItem('rememberPassword'):'',
  },
  getters: {
  },
  mutations: {
    //修改token，并把token存入localStorage
    changeLogin(state,user){
      state.Authorization=user.Authorization
      state.userName=user.userName
      state.userIdentity=user.userIdentity //登录身份
      localStorage.setItem('Authorization',user.Authorization)
      localStorage.setItem('userName',user.userName)
      localStorage.setItem('userAvatar',user.userAvatar)
      localStorage.setItem('userIdentity',user.userIdentity)
    },
    //删除token
    delLogin(state){
      console.log('delete token')
      state.Authorization=''
      state.userName=''
      state.userAvatar=''
      localStorage.clear()
      // localStorage.removeItem('Authorization')
      // localStorage.removeItem('userName')
      // localStorage.removeItem('userAvatar')
    },
  },
  actions: {
  },
  modules: {
  }
})
