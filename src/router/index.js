// 定义router对象  导出给main.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'

import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  // 路由规则配置
  // name的作用给当前路由规则取名  $router.push('/login')  或者 $router.push({name:'login'})
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image },
        { path: '/publish', name: 'publish', component: Publish },
        { path: '/comment', name: 'comment', component: Comment }
      ]
    },
    { path: '*', name: '404', component: NotFound }
  ]
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // // 1.判断是不是登录路由
  // if (to.path === '/login') return next()
  // // 判断是否登录
  // if (!store.getUser().token) return next('/login')
  // // 3. 否则全部放行
  // next()

  // 精简代码
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
