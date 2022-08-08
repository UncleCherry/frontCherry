
/*
和用户有关的api接口
*/

import request from '@/utils/request'

export function changePassword(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/User/password',
        method: 'put',
        data:param
      })
}

export function unsubscribe() {
    return request({
        url: '/User',
        method: 'delete',
      })
}
