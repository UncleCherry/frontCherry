
/*
和注册有关的api接口
*/

import request from '@/utils/request'

export function studentRegister(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Register/student',
        method: 'post',
        data:param
      })
}

export function instructorRegister(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Register/instructor',
        method: 'post',
        data:param
      })
}

export function adminRegister(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Register/admin',
        method: 'post',
        data:param
      })
}