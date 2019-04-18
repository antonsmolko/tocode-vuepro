import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

// Modules
import notes from '@/store/notes';

// End-Modules

const state = {
    errorMessage: ''
}

const mutations = {
    CLEAR_ERROR_MESSAGE (state) {
        state.errorMessage = '';
    }
}

const actions = {
    clearErrorMessage ({commit}) {
        commit('CLEAR_ERROR_MESSAGE');
    }
}

const getters = {}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        notes
    }
})