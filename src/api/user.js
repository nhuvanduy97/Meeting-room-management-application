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