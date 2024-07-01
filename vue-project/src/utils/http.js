import axios from 'axios'

import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

import { getToken } from '@/utils/auth.js'

// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'https://api.ziahh.top/api',
  timeout: 10000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  if (getToken('TokenKey')) {
    config.headers.authentication = getToken('TokenKey')
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => {
  const { data, msg, code } = res.data
  if (code == 1) {
    return data
  } else {
    ElMessage({ type: 'error', message: msg })
    return Promise.reject(new Error(msg))
  }
}, (error) => {
  ElMessage({ type: 'error', message: error.msg })
  return Promise.reject(error)
})


export default httpInstance