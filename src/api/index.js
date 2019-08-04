//
import axios from 'axios'
import store from '@/store'

// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 请求头 自定义字段
axios.defaults.headers = {
  Authorization: `Bearer ${store.getUser().token}`
}
// 进行导出
export default axios
