import { asyncRoutes, constantRoutes } from '@/router'
import rootRoutes from '@/router/rootRoutes'

export default {
  namespaced: true,
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => { // 设置路由表
      state.addRoutes = routes // 将异步路由存储
      state.routes = constantRoutes.concat(routes) // 设置路由表为 异步路由 + 常量路由，即所有已有的路由
    }
  },
  actions: {
    generateRoutes({ commit, rootState }, routes) { // 格式化路由表
      return new Promise(resolve => {
        let accessedRoutes = [] // 初始路由表
        if (rootState.user.role === 'root') { // 如果用户是 root
          accessedRoutes = [...asyncRoutes, ...rootRoutes] // 拥有所有路由
        } else { // 如果是普通管理员
          const mergeRoutes = (origin, target) => {
            origin.forEach(o => {
              target.forEach(t => {
                if (o.name === t.name) {
                  t.component = o.component
                }
                if (o.children && t.children) {
                  mergeRoutes(o.children, t.children)
                }
              })
            })
          }
          mergeRoutes(asyncRoutes, routes) // 合并路由 component
          routes.push({ path: 'https://github.com/yinchengnuo/vueElementAdmin', name: 'GitHub', meta: { title: 'GitHub', icon: 'GitHub' }})
          routes.push({ path: '*', redirect: '/404', hidden: true })
          accessedRoutes = routes
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}
