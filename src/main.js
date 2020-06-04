import Vue from 'vue' // 引入 vue
import App from './App' // 引入 App.vue
import store from './store' // 引入 vuex
import router from './router' // 引入 vue-router
import Element from 'element-ui' // elementUI
import Cookies from 'js-cookie' // 引入 cookiejs
import Swiper from 'vue-awesome-swiper' // 引入 swiper
import DataView from '@jiaminghi/data-view' // 引入数据大屏

import './icons' // 图标库
import './permission' // 权限控制
import '@/styles/index.scss' // 全局样式
import 'swiper/css/swiper.css' // swiper 样式
import 'normalize.css/normalize.css' // css reset 方案
import './styles/element-variables.scss' // elementUI 样式

import Plugin from './plugins' // 引入自定义 vue 方法

Vue.use(Swiper)
Vue.use(DataView)
Vue.use(Plugin)
Vue.use(Element, { size: Cookies.get('size') || 'medium' }) // 设置 Element 默认字号

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
