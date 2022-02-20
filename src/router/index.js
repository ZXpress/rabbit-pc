import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const Goods = () => import('@/views/goods/index')

const routes = [
  // 一级路由
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: import('@/views/category/index') },
      { path: '/category/sub/:id', component: import('@/views/category/sub') },
      { path: '/product/:id', component: Goods }
    ]
  }
]

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({}) 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次切换路由滚动到页面顶部
  scrollBehavior () {
    // vue2.0通过x和y
    // vue3.0通过left和top
    return { left: 0, top: 0 }
  }
})

export default router
