import Vuex from "vuex"
import Vue from "vue"
import users from "./module/users"
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        namspace: true,
        users
    }
})