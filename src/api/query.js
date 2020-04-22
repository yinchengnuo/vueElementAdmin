import request from '@/utils/request'

export const api_getList = params => request({ url: '/query/list', method: 'get', params })
