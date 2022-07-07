
/*
和学生有关的api接口
*/

import request from '@/utils/request'

export function studentLogin(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/login/student',
        method: 'post',
        data:param
      })
}