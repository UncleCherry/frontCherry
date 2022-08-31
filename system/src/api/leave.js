/*
和请假有关的api接口
*/

import request from '@/utils/request'

export function createLeave(data){
    let param = new URLSearchParams(data);
    return request({
        url:'/Leave/create',
        method:'post',
        data:param
    })
}

export function deleteLeave(data){
    let param = new URLSearchParams(data);
    return request({
        url:'/Leave/DeleteInfo',
        method:'delete',
        data:param
    })
}

export function getStudentLeave(){
    return request({
        url:'/Leave/student',
        method:'get'
    })
}

export function getAdminLeave(){
    return request({
        url:'/Leave/admin',
        method:'get'
    })
}

export function getApplicationInfo(data){
    return request({
        url:'/Leave/getApplicationInfo',
        method:'get',
        params:{
            "leaveid":data["leaveid"]
        }
    })
}