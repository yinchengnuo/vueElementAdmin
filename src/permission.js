import store from './store' // 引入vueX
import router from './router' // 引入vue-router
import 'nprogress/nprogress.css' // 进度条样式
import NProgress from 'nprogress' // 进度条
import { Message } from 'element-ui' // element-ui消息提示框
import { getToken } from '@/utils/auth' // 从 cookie 获取 token 方法
import defaultSettings from '@/settings' // 项目默认设置
NProgress.configure({ showSpinner: false }) // // 进度条配置，不要加载时的圈圈

window.addEventListener('storage', ({ key }) => key === 'LOGOUT' && location.reload()) // 监听退出登录事件

const whiteList = ['/login', '/auth-redirect', '/realtime-data'] // 路由白名单

router.beforeEach(async(to, from, next) => { // 全局导航守卫
  NProgress.start() // 进度条开始移动
  document.title = to.meta.title ? `${defaultSettings.title}-${to.meta.title}` : `${defaultSettings.title}` // 设置页面title
  if (getToken()) { // 当 cookie 中有 token （即用户已经登录）
    if (to.path === '/login') { // 如果 to.path 为 login 页面，则跳转到本页
      next({ path: '/' })
    } else { // 如果 to.path 为其他页面，则进行下一步判断
      if (store.getters.routes) { // 如果 vueX 中有路由表
        next() // 直接进入该页面
      } else { // vueX 中没有路由表，表示用户刷新了页面，这时要重新获取路由表
        try {
          router.addRoutes(await store.dispatch('permission/generateRoutes', await store.dispatch('user/getInfo'))) // 格式化并挂载路由
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/logout') // 出现错误退出登录
          Message.error(error || '网络可能出了点问题')
          next(`/login`)
        }
      }
    }
  } else { // 如果 cookie 中没有 token （即用户未登录）
    if (whiteList.indexOf(to.path) !== -1) { // 检查路由是否命中白名单
      next() // 命中直接跳转
    } else {
      next(`/login?redirect=${to.path}`) // 没有命中带着要跳转的页面 path 去登录页
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 进度条结束移动
})
