/*
和用户信息有关的api接口
*/

import request from '@/utils/request'

export function getStudentInfo() {
    return request({
        url: '/student/Info',
        method: 'get',
      })
}

export function getInstructorInfo() {
    return request({
        url: '/Instructor/Info',
        method: 'get',
      })
}

export function getAdminInfo() {
    return request({
        url: '/Admin/Info',
        method: 'get',
      })
}