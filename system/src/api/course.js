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

export function createCourse(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Course/create',
        method: 'post',
        data:param
    })
}

export function getInstructorCourse() {
    return request({
        url: '/Course/instructor',
        method: 'get',
    })
}

export function instructCourse(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Course/instruct',
        method: 'post',
        data:param
    })
}

export function unInstructCourse(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Course/uninstruct',
        method: 'delete',
        data:param
    })
}

export function getCourseInfo(data) {
    return request({
        url: '/Course/getinfo',
        method: 'get',
        params: data
    })
}
export function altMeetingid(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Course/altMeetingid',
        method: 'put',
        data:param
      })
}