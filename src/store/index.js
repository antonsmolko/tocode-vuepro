import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import loading from './loading'
import error from './error'
import notify from './notify'

const state = {}
const mutations = {}
const actions = {}
const getters = {}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        loading,
        error,
        notify
    }
})