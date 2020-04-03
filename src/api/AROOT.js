import request from '@/utils/request'

export function set_repair(data) {
  return request({
    method: 'get',
    url: '/setting/repair',
    params: data
  })
}

