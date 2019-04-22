import axios from 'axios'

const state = {
    items: [],
    user: null,
    itemsCount: 4,
    itemsIncrement: 3
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
    },
    ADD_ITEMS_COUNT (state) {
        state.itemsCount += state.itemsIncrement;
    },
    SET_ITEMS_COUNT (state, payload) {
        state.itemsCount = payload;
    }
}
const actions = {
    getItems ({commit}, payload) {
        commit('CLEAR_ITEMS');
        return axios
          .get(`https://api.github.com/users/${payload}/repos`)
          .then(response => {
            commit('SET_ITEMS_COUNT', 4);
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
    },
    addItemsCount ({commit}) {
        commit('ADD_ITEMS_COUNT');
    }
}
const getters = {
    maxLength: state => state.itemsCount >= state.items.length
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}