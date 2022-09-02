
/*
和申请有关的api接口
*/

import request from '@/utils/request'

export function StudentCreateScoreApplication(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Application/create',
        method: 'post',
        data:param
      })
}

export function getStudentScoreApplication() {
    return request({
        url: '/Application/student',
        method: 'get',
    })
}

export function AdmingetStudentApplication() {
    return request({
        url: '/Application/admin',
        method: 'get',
    })
}

export function AdminRejectApplication(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Application/reject',
        method: 'put',
        data:param
      })
}
export function AdminPassScoreApplication(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Application/pass',
        method: 'put',
        data:param
      })
}
