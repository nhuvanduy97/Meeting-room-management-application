import request from "@/utils/request"


export function getBookingOfUser(userId) {
    return request({
        url: '/api/get-bookingofuser',
        method: 'get',
        params: {
            _id: userId
        }
    })
}

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

export function findBooking(idRoom, date) {
    return request({
        url: '/api/find-booking',
        method: 'get',
        params: {
            room: idRoom,
            date: date
        }
    })
    
}
export function confirmBooking(data) {
    return request({
        url: '/api/update-booking',
        method: 'put',
        data
    })
}
