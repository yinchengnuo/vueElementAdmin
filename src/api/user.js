import request from '@/utils/request'

export function api_Login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function api_GetUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function changepsw(data) {
  return request({
    url: '/user/password',
    method: 'post',
    data
  })
}
