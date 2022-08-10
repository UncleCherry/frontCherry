/*
和课程有关的api接口
*/

import request from '@/utils/request'

export function getStudentCourse() {
    return request({
        url: '/Course/student',
        method: 'get',
    })
}

export function getAllCourse() {
    return request({
        url: '/Course/all',
        method: 'get',
    })
}

export function takeCourse(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Course/take',
        method: 'post',
        data:param
    })
}

export function dropCourse(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Course/drop',
        method: 'delete',
        data:param
    })
}
