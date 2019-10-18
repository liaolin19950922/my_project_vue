import Vue from 'vue'
import Router from 'vue-router'
// 使用懒加载的方式来引入,只有路由被访问的时候才加载
import home from '@/components/home'

const loginpage = resolve => require(['@/components/login'], resolve)

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      nam: 'login',
      component: loginpage
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})
// 对每次访问之前都要先看是否已经登录
router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem('access-token')
  debugger
  if (to.path.startsWith('/login')) {
    if (!token) {
      next()
    } else {
      next({ path: '/home' })
    }
  } else {
    if (!token) {
      // 未登录  跳回主页面
      next()
    } else {
      next()
    }
  }
})

export default router
