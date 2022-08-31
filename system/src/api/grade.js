
/*
和成绩有关的api接口
*/

import request from '@/utils/request'

// export function StudentCreateScoreApplication(data) {
//     let param = new URLSearchParams(data);
//     return request({
//         url: '/Application/create',
//         method: 'post',
//         data:param
//       })
// }

export function getStudentScore() {
    return request({
        url: '/Grade/student',
        method: 'get',
    })
}
export function getTeacherScore() {
    return request({
        url: '/Grade/ins_exam',
        method: 'get',
    })
}
export function ShowStudentScore(examid) {
    let param = new URLSearchParams(examid);
    return request({
        url: '/Grade/studentsinexam',
        method: 'get',
        data:examid
    })
}

