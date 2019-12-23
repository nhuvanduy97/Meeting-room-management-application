import request from "@/utils/request"

export function getPermissonbyId(userId) {
    return request({
        url: '/api/get-permisson-inviter-by-id',
        method: 'get',
        params: {
            idUser: userId
        }
    })
}