import Vuex from "vuex"
import Vue from "vue"
import users from "./module/users"
import VuexPersistence  from "vuex-persist"
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        namspace: true,
        users
    },
    plugins: [vuexLocal.plugin]
})