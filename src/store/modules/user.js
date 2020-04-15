import { resetRouter } from '@/router'
import { Message } from 'element-ui'
import { api_Login, api_GetUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  name: '',
  role: '',
  avatar: '',
  routes: null,
  token: getToken()

}

const mutations = {
  SET_TOKEN: (state, token) => { // 设置 token
    state.token = token
  },
  SET_NAME: (state, name) => { // 设置 name
    state.name = name
  },
  SET_ROLE: (state, role) => { // 设置 role
    state.role = role
  },
  SET_AVATAR: (state, avatar) => { // 设置头像
    state.avatar = avatar
  },
  SET_ROUTES: (state, routes) => { // 设置路由表
    state.routes = routes
  }
}

const actions = {
  login({ commit }, userInfo) { // 登录
    const { username, password } = userInfo // 获取用户名和密码
    return new Promise((resolve, reject) => {
      api_Login({ username, password }).then(({ code, message, data }) => { // 发送网络请求
        if (code === 200) {
          commit('SET_TOKEN', data.token) // 将 token 放入 vueX
          setToken(data.token) // 将 token 存在 cookie
          resolve()
        } else {
          Message.error(message)
          reject(message)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) { // 获取用户信息
    return new Promise((resolve, reject) => {
      api_GetUserInfo().then(({ data }) => { // 获取用户基本信息和路由信息
        commit('SET_NAME', data.name) // 添加用户名至 vueX
        commit('SET_ROLE', data.role) // 添加角色名名至 vueX
        commit('SET_AVATAR', data.avatar) // 添加用户头像至 vueX
        commit('SET_ROUTES', data.routes) // 添加路由表至 vueX
        resolve(state.routes) // 将路由表传出
      }).catch(error => reject(error))
    })
  },
  logout({ commit, dispatch }) { // 退出登录
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROUTES', null)
      removeToken()
      resetRouter()
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
