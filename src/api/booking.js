import request from "@/utils/request"

export function getAllBookingRoom() {
    return request({
        url: '/api/get-booking-room',
        method: 'get'
    })
}
export function reserveRoom(data) {
    return request({
        url: '/api/reserve-room',
        method: 'post',
        data
    })
}