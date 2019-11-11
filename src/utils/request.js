import axios from "axios"
import configDB from "../common/config"
import Cookies from "vue-cookies"
const service = axios.create({
    baseURL: configDB.database,
    timeout: 120000
})

service.interceptors.request.use(
    config => {
        let token = Cookies.get("token")
        if (token) {
            config.headers['Authorization'] = token,
            config.headers['Access-Control-Allow-Headers'] = '*'
        }
        return config
    },
    err => {
        console.log(err)
        Promise.reject(err)
    }
)
service.interceptors.response.use(
    function (response) {
        return response
    },
    function(err) {
        return Promise.reject(err)
    }
)

export default service