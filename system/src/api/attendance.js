/*
和考勤有关的api接口
*/

import request from '@/utils/request'

export function getStudentAttendance(data) {
    return request({
        url: '/Attendance/getInfo',
        method: 'get',
        params:{
            "courseid":data["courseid"],
            "number":data["number"],
            "studentid":data["studentid"]
        }
    })
}

export function uploadAttendance(data) {
    let param=JSON.stringify(data);
    return request({
        url: '/Attendance/insertInfo',
        method: 'post',
        data:param,
        headers:{'Content-Type':'application/json'}
    })
}

export function modifyAttendance(data) {
    //let param=JSON.stringify(data);
    let param = new URLSearchParams(data);
    return request({
        url: '/Attendance/ModifyInfo',
        method: 'put',
        data:param,
    })
}

export function deleteAttendance(data) {
    //let param=JSON.stringify(data);
    let param = new URLSearchParams(data);
    return request({
        url: '/Attendance/DeleteInfo',
        method: 'delete',
        data:param,
    })
}

export function getAttendanceScore(data) {
    return request({
        url: '/Attendance/getGrade',
        method: 'get',
        params:{
            "courseid":data["courseid"]
        }
    })
}