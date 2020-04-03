import request from '@/utils/request'

export function getRole() {
  return request({
    url: '/role/all',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/role/update',
    method: 'post',
    data
  })
}

export function deleteRole(data) {
  return request({
    method: 'get',
    url: '/role/del',
    params: data
  })
}

export function getUser() {
  return request({
    url: '/user/all',
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    method: 'get',
    url: '/user/del',
    params: data
  })
}
