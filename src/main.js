import Vue from 'vue' // 引入 vue
import App from './App' // 引入 App.vue
import store from './store' // 引入 vuex
import router from './router' // 引入 vue-router
import Element from 'element-ui' // elementUI
import Cookies from 'js-cookie' // 引入 cookiejs

import './icons' // 图标库
import './permission' // 权限控制
import '@/styles/index.scss' // 全局样式
import 'normalize.css/normalize.css' // css reset 方案
import './styles/element-variables.scss' // elementUI 样式
import * as filters from './filters' // 全局过滤器

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // 设置 Element 默认字号
})

Object.keys(filters).forEach(key => { // 挂载全局过滤器
  Vue.filter(key, filters[key])
})

// 注册全局自定义按钮权控指令 `v-permission`
Vue.directive('button-permission', {
  bind: (el, { arg }, { context: { $route: { meta }}}) => {
    // if (meta.buttonPermission && arg && meta.buttonPermission[arg]) {
    //   if (!meta.buttonPermission[arg].permission) {
    //     el.remove()
    //   }
    // }
  }
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
