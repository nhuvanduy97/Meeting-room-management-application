import request from "@/utils/request"

export function getAllRoom() {
    return request({
        url: '/api/info-room',
        method: 'get'
    })
}

export function addRoom(data) {
    return request({
        url: '/api/add-room',
        method: 'post',
        data
    })
}