// 1.创建一个新的axios实例
// 2.请求拦截器，有token进行头部携带
// 3.响应拦截器，1.剥离无效数据，2.处理失效token
// 4.导出一个函数，调用当前的axios实例发送请求，返回值promise
import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址 将来其他地方不是通过axios发送请求需要用上
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  // 配置
  baseURL,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 拦截业务
    // 进行请求配置的修改
    // 如果本地有token就在头部携带
    // 1.获取用户信息队形
    const { profile } = store.state.user
    // 2.判断是否有token
    if (profile.token) {
      // 3.设置token
      config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => res.data, // 取出data数据
  (err) => {
    // 401 token失效
    if (err.response && err.response.status === 401) {
      // 1.清空本地无效的用户信息
      store.commit('user/setUser', {})
      // 2.跳转到登录页,并且传参当前路由地址给登录页
      // 当前路由地址
      // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
      // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(err)
  }
)

// 请求工具函数
const request = (url, method, submitData) => {
  // 负责请求：请求地址 请求方式 发送的数据
  return instance({
    url,
    method,
    // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
    // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData 这样理解
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
