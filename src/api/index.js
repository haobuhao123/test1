// 配置一个axios  导出一个配置好的axios
import axios from 'axios'
import store from '@/store'
import router from '@/router'

import JSONBig from 'json-bigint'

// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [
  (data) => {
  //  data 此时是后端的原始数据
  // data后台如果没有返回数据 值为null
  // JSONBig.parse(null) 报错，组织程序执行
    try {
      return JSONBig.parse(data)// JSONBig 记得要在上面导出，否则会报错 undefind
    } catch (e) {
      return data
    }
  }]
// 请求头 自定义字段

// 下面这段代码只会执行一次
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }

// 在每次请求之前，获取token信息，追加在heades中
// 请求拦截器，在每次请求前，做某一些事情
axios.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, (error) => {
  // 错误处理
  return Promise.reject(error)
})
// 响应拦截器：在每次响应后 做某一些事情
axios.interceptors.response.use((res) => {
  // 成功的时候做一些事情
  return res
}, (err) => {
  // 失败的时候做一些事情
  // 获取响应状态码 err对象包含响应对象  err.response
  // 响应对象中包含状态码  err.response.status
  if (err.response.status === 401) {
    // 跳转到登录页面 this.$router.push('/login')

    // 方式1：
    // $router.push('/login') 其实 地址栏改成  #/login
    // location.hash = '#/login'

    // 方式2：
    // 此时没有vue实例，$router对象获取不到，通过router实例直接使用
    router.push('/login')
  }
  return Promise.reject(err)
})

// 进行导出
export default axios
