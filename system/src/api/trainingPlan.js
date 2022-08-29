/*
和培养计划有关的api接口
*/

import request from '@/utils/request'

export function getAllPlans() {
    return request({
        url: '/Plan/all',
        method: 'get',
      })
}

export function getStudentPlan() {
    return request({
        url: '/Plan/student',
        method: 'get',
      })
}

export function createTrainingPlan(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Plan/create',
        method: 'post',
        data:param
      })
}

export function altTrainingPlan(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Plan/alt',
        method: 'put',
        data:param
      })
}