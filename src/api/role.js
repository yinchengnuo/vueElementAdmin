import request from '@/utils/request'

export const getRole = params => request({ url: '/role/all', method: 'get', params })
export const deleteRole = params => request({ url: '/role/del', method: 'get', params })
export const addRole = data => request({ url: '/role/add', method: 'post', data })
export const updateRole = data => request({ url: '/role/update', method: 'post', data })

export const getUser = params => request({ url: '/user/all', method: 'get', params })
export const deleteUser = params => request({ url: '/user/del', method: 'get', params })
export const addUser = data => request({ url: '/user/add', method: 'post', data })
export const updateUser = data => request({ url: '/user/update', method: 'post', data })
