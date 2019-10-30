import Vue from 'vue'
import Router from 'vue-router'
// 使用懒加载的方式来引入,只有路由被访问的时候才加载
// import home from '@/components/home'
import Container from '@/components/Container'
import Dashboard from '@/views/dashboard'
import Article from '@/views/article'

const loginpage = resolve => require(['@/components/login'], resolve)

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/login',
      nam: 'login',
      component: loginpage
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Container',
      component: Container,
      children: [
        {path: 'dashboard',
          name: '首页',
          component: Dashboard,
          children: [
            {
              path: 'dashboard1',
              name: '首页1',
              component: Dashboard
            },
            {
              path: 'dashboard2',
              name: '首页2',
              component: Dashboard,
              children: [
                {
                  path: 'dashboard21',
                  name: '首页21',
                  component: Dashboard
                },
                {
                  path: 'dashboard22',
                  name: '首页22',
                  component: Dashboard
                }
              ]
            }
          ]
        },
        {
          path: 'article',
          name: '文章',
          component: Article
        }
      ]
    }
  ]
})
// 对每次访问之前都要先看是否已经登录
// router.beforeEach((to, from, next) => {
//   let token = window.sessionStorage.getItem('access-token')
//   debugger
//   if (to.path.startsWith('/login')) {
//     if (!token) {
//       next()
//     } else {
//       next({ path: '/home' })
//     }
//   } else {
//     if (!token) {
//       // 未登录  跳回主页面
//       next()
//     } else {
//       next()
//     }
//   }
// })
router.beforeEach((to, from, next) => {
  debugger
  if (to.path === '/login') {
    sessionStorage.removeItem('access-token')
  }
  var user = sessionStorage.getItem('access-token')
  if (!user && to.path !== '/login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router
