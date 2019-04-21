const state = {
    loading: true
}
const mutations = {
    CHANGE_LOADING (state, payload) {
        state.loading = !!payload;
    }
}
const actions = {
    changeLoading ({commit}, payload) {
        commit('CHANGE_LOADING', payload);
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}