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