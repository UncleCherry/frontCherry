/*
和学生信息有关的api接口
*/

import request from '@/utils/request'

export function getStudentInfo(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/student/Info',
        method: 'get',
        data:param
      })
}