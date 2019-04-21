const state = {
    notifyError: null
}
const mutations = {
    SET_NOTIFY_ERROR (state, payload) {
        state.notifyError = payload;
    }
}
const actions = {}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}