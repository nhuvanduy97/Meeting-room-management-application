import request from "@/utils/request"

export function getAllBookingRoom() {
    return request({
        url: '/api/get-booking-room',
        method: 'get'
    })
}