/*
和录播有关的api接口
*/

import request from '@/utils/request'

export function getRecordInfo(data) {
    return request({
        url: '/Record/getRecords',
        method: 'get',
        params: data
    })
}

export function addRecordInfo(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Record/postRecord',
        method: 'post',
        data:param
    })
}

export function altUrlInfo(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Record/altRecord',
        method: 'put',
        data:param
      })
}

export function deleteUrl(data) {
    let param = new URLSearchParams(data);
    return request({
        url: '/Record/delRecord',
        method: 'delete',
        data:param
    })
}