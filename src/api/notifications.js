import request from "@/utils/request"

export function getNotificationByIdUser(idUser) {
    return request({
        url: '/api/get-notification-by-id-receiver',
        method: 'get',
        params: {
            idReceiver: idUser
        }    
    })
}

export function makupNotification(data) {
    return request({
        url: '/api/makup-noti',
        method: 'put',
        data
    })
}