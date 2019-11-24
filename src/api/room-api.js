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

export function updateRoom(data) {
    return request({
        url: '/api/update-room',
        method: 'put',
        data
    })
}

export function deleteRoom(idRoom) {
    return request({
        url: '/api/delete-room',
        method: 'delete',
        params: {
            _id: idRoom
        }
    })
}