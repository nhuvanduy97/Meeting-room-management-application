import request from "@/utils/request"

export function getUserByTeamId(teamId) {

    return request({
        url: "/api/get-user-by-teamid",
        method: 'get',
        params: {
            teamId: teamId
        }
    })
}
export function  getInfoUserById(id) {
    return request({
        url: "/api/get-user-by-id",
        method: 'get',
        params: {
            _id: id
        }
    })
}