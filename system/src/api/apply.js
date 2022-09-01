
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

