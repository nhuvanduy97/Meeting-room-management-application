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
export function invitedMember(data) {
    return request({
        url: '/api/invited-member',
        method: 'put',
        data
    })
}
export function deleteRoom(idBooking) {
    console.log("duy", idBooking)
    return request({
        url: '/api/delete-room',
        method: 'delete',
        params: {
            _id: idBooking
        }
    })
}

export function  findBookingById(idBooking) {
    return request({
        url: '/api/find-booking-by-id',
        method: 'get',
        params: {
            _id: idBooking
        }
    })
}
