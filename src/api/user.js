import request from '@/utils/request'

export const api_Login = (data) => request({ url: '/user/login', method: 'post', data })
export const api_GetUserInfo = () => request({ url: '/user/info', method: 'get' })
export const changepsw = (data) => request({ url: '/user/password', method: 'post', data })
