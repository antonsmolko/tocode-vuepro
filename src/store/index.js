import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import repos from './repos'

const state = {
    repos: []
}
const mutations = {}
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