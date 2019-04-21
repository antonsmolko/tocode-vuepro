import axios from 'axios'

const state = {
    messages: [],
    notifyCount: '',
    notifyIncrement: ''
}

const mutations = {
    SET_MESSAGES (state, payload) {
        state.messages = payload;
    },
    CLEAR_MESSAGES (state) {
        state.messages = [];
    },
    ADD_NOTIFY_COUNT (state) {
        if (state.notifyCount < state.messages.length) {
            state.notifyCount += state.notifyIncrement;
        }
    },
    SET_NOTIFY_COUNT (state, payload) {
        state.notifyCount = +payload;
    },
    SET_NOTIFY_INCREMENT (state, payload) {
        state.notifyIncrement = +payload;
    }
}

const actions = {
    // getMessages ({commit}) {
    //     return axios
    //       .get('https://tocode.ru/static/c/vue-pro/notifyApi.php')
    //       .then(response => commit('SET_MESSAGES', response.data.notify))
    //       .catch(error => console.error(error));
    // },
    getMessagesLazy ({commit}) {
        return axios
            .get('https://tocode.ru/static/c/vue-pro/notifyApi.php')
            .then(response => {
                commit('loading/CHANGE_LOADING', true, { root: true });
                // Получение данных и всех параметров приложения от сервера
                commit('SET_NOTIFY_COUNT', 3);
                commit('SET_NOTIFY_INCREMENT', 2);
                commit('CLEAR_MESSAGES');
                setTimeout(() => {
                    commit('SET_MESSAGES', response.data.notify);
                    commit('loading/CHANGE_LOADING', false, { root: true });
                }, 2000);
            })
            .catch(error => commit('error/SET_NOTIFY_ERROR', error, { root: true }));
    },
    addNotifyCount ({commit}) {
        commit('ADD_NOTIFY_COUNT');
    }
}
const getters = {
    getMessagesMainDir: state => count => state.messages.sort((a,b) => b.main - a.main).slice(0, count),
    maxLength: state => state.notifyCount >= state.messages.length
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}