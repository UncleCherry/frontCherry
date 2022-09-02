
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

export function getGrades() {
    return request({
        url: '/Grade/student',
        method: 'get',
      })
}

export function getCourseExams() {
    return request({
        url: '/Grade/ins_exam',
        method: 'get',
      })
}

export function getStudentInExam(data) {
  return request({
      url: '/Grade/studentsinexam',
      method: 'get',
      params:data
    })
}

export function addGrade(data) {
  let param = new URLSearchParams(data);
  return request({
      url: '/Grade/create',
      method: 'post',
      data:param
    })
}

export function altGrade(data) {
  let param = new URLSearchParams(data);
  return request({
      url: '/Grade/alt',
      method: 'put',
      data:param
    })
}

export function delGrade(data) {
  let param = new URLSearchParams(data);
  return request({
      url: '/Grade/del',
      method: 'delete',
      data:param
    })
}
