import axios from 'axios'


const service = axios.create({
    //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    baseURL:'https://localhost:5001/api/',
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
    //withCredentials: true//携带cookie
    async:true,
    crossDomain:true,
  })
  
  // request interceptor
service.interceptors.request.use(
    config => {
      // do something before request is sent
      if (localStorage.getItem('Authorization')) {
        config.headers.Token = localStorage.getItem('Authorization');
        console.log('本次request请求传递了token信息')
      }

      return config;
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
      const res = response.data
      console.log('真实的回复为：',response)
      // if the custom code is not 200, it is judged as an error.
      if (res.errorCode != 200) {

        //判断token是否失效
        if(res.errorCode==400){
          //清除当前token信息
          store.commit('delLogin');
          //打开登录界面
          startLogin()
          //前往首页
          //this.$router.replace('/');

          Message({
            message: '您尚未登录，请先登录',
            type: 'error',
            duration: 5 * 1000
          })


          return Promise.reject(new Error('您尚未登录'||'Error'))
        }

        return Promise.reject(new Error(res.msg || 'Error'))
      } else {
        return res
      }
    },
    error => {
      console.log('error') // for debug
      return Promise.reject(error)
    }

)

  export default service