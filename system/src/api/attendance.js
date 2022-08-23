/*
和考勤有关的api接口
*/

import request from '@/utils/request'

export function getStudentAttendance(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Attendance/getInfo',
        method: 'get',
        data: param
    })
}

export function uploadAttendance(data) {
    //let param = new URLSearchParams(data);
    let param=JSON.stringify(data);
    //let param=data;
    return request({
        url: '/Attendance/insertInfo',
        method: 'post',
        data:param,
        headers:{'Content-Type':'application/json'}
    })
}