import axios from 'axios'

const state = {
    items: [],
    user: null
}
const mutations = {
    SET_ITEMS (state, payload) {
        state.items = payload;
    },
    CLEAR_ITEMS (state) {
        state.items = [];
    },
    SET_USER (state, payload) {
        state.user = payload;
    },
    CLEAR_USER (state) {
        state.user = null;
    }
}
const actions = {
    getItems ({commit}, payload) {
        commit('CLEAR_ITEMS');
        return axios
          .get(`https://api.github.com/users/${payload}/repos`)
          .then(response => {
            commit('SET_ITEMS', response.data);
            commit('CLEAR_ERROR', null, {root: true});
          })
          .catch(() => commit('CLEAR_ITEMS'));
    },
    getUser ({commit}, payload) {
        commit('CLEAR_USER');
        return axios
            .get(`https://api.github.com/users/${payload}`)
            .then(response => {
                commit('SET_USER', response.data);
                commit('CLEAR_ERROR', null, {root: true});
            })
            .catch(() => {
                commit('CLEAR_USER');
                commit('SET_ERROR', 'Can`t find this user!', {root: true});
            });
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