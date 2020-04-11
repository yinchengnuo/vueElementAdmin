import request from '@/utils/request'

export const api_getRole = params => request({ url: '/role/all', method: 'get', params })
export const api_deleteRole = params => request({ url: '/role/del', method: 'get', params })
export const api_addRole = data => request({ url: '/role/add', method: 'post', data })
export const api_updateRole = data => request({ url: '/role/update', method: 'post', data })

export const api_getAccount = params => request({ url: '/account/all', method: 'get', params })
export const api_deleteAccount = params => request({ url: '/account/del', method: 'get', params })
export const api_addAccount = data => request({ url: '/account/add', method: 'post', data })
export const api_updateAccount = data => request({ url: '/account/update', method: 'post', data })
