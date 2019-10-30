// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入elemen-u控件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入主页样式
import '@/styles/index.scss'
import 'font-awesome/scss/font-awesome.scss'

Vue.config.productionTip = false
// 使用use命令后才起作用
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
