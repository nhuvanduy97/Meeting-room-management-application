const state = {
    user: {}
};

const getters = {
    getUserInfos: (state) => state.user
};

const actions = {
    storingUser ({ commit }, user) {
        console.log("action", user)
        commit("STORING_USER_INFO", user)
    }
};

const mutations = {
    STORING_USER_INFO (state, user) {
        state.user = user
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};

