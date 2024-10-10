// 该文件主要对 axios 进行二次封装，主要是对请求和响应进行拦截处理
import axios from 'axios'

// 创建 axios实例
const request = axios.create({
  baseURL: 'http://localhost:3000', // api的base_url
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    //   config 就是你的请求
    // 做一些其他的事情，比如给请求头添加 token

    // 请求放行
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    //   response 就是你的响应
    // 做一些其他的事情，比如判断 token 是否过期

    // 响应放行
    return response.data
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

export default request
