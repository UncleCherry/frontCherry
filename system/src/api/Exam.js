/*
和考试有关的api接口
*/

import request from '@/utils/request'


export function createExam(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Exam/create',
        method: 'post',
        data:param
      })
}


export function deleteExam(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Exam/del',
        method: 'del',
        data:param
      })
}

export function changeExam(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Exam/alt',
        method: 'put',
        data:param
      })
}

export function getAllExam() {
    return request({
        url: '/Exam/all',
        method: 'get',
      })
}

