
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

