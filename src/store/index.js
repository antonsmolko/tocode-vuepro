import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import repos from './repos'

const state = {
    error: ''
}
const mutations = {
    SET_ERROR (state, payload) {
        state.error = payload;
    },
    CLEAR_ERROR (state) {
        state.error = '';
    }
}
const actions = {}
const getters = {}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        repos
    }
})