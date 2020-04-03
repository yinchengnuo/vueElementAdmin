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
      state.routes = constantRoutes.concat(routes) // 设置路由表为 异步路由 + 常量路由
    }
  },
  actions: {
    generateRoutes({ commit }, routes) { // 格式化路由表
      return new Promise(resolve => {
        let accessedRoutes = [] // 初始路由表
        if (routes.includes('admin') || routes.includes('root')) { // 如果用户是 root 或者 admin
          accessedRoutes = asyncRoutes // 拥有全部路由
          if (routes.includes('root')) { // 如果是 root 用户
            accessedRoutes.splice(accessedRoutes.length - 1, 0, ...rootRoutes) // 额外拥有 root 路由
          }
        } else { // 如果是普通管理员
          asyncRoutes.forEach(e => {
            routes.forEach(r => {
              if (r.name === e.name) {
                r.component = e.component
              }
              if (e.children && r.children) {
                e.children.forEach(ec => {
                  r.children.forEach(rc => {
                    if (ec.name === rc.name) {
                      rc.component = ec.component
                    }
                  })
                })
              }
            })
          })
          routes.push({ path: '*', redirect: '/404', hidden: true })
          accessedRoutes = routes
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}
