import Vue from 'vue'

const state = {
    newItemFields: {
        title: '',
        descr: '',
        priority: ''
    },
    // editItemFields: {
    //     title: '',
    //     descr: ''
    // },
    priorities: [
        { name: 'Стандарт', key: 'standart'},
        { name: 'Высокий', key: 'high'},
        { name: 'Очень высокий', key: 'very-high'},
    ],
    items: []
}

const mutations = {
    LOAD_ITEMS (state, payload) {
        state.items = payload;
    },
    CHANGE_NEW_ITEM_TITLE_FIELD (state, payload) {
        state.newItemFields.title = payload;
    },
    CHANGE_NEW_ITEM_DESCR_FIELD (state, payload) {
        state.newItemFields.descr = payload;
    },
    CHANGE_NEW_ITEM_PRIORITY_FIELD (state, payload) {
        state.newItemFields.priority = payload;
    },
    CLEAR_NEW_ITEM_FIELDS (state) {
        for (let field in state.newItemFields) {
            state.newItemFields[field] = '';
        }
    },
    // CHANGE_ITEM_TITLE_FIELD (state, payload) {
    //     state.editItemFields.title = payload;
    // },
    // CHANGE_ITEM_DESCR_FIELD (state, payload) {
    //     state.editItemFields.descr = payload;
    // },
    CLEAR_FIELDS (state) {
        for (let field in state.editItemFields) {
            state.editItemFields[field] = '';
        }
    },
    ADD_ITEM (state, payload) {
        state.items.push(payload);
    },
    EDIT_ITEM (state, payload) {
        state.items.forEach(item => {
            if (item.id == payload) item.edit = true;
        })
    },
    UPDATE_ITEM (state, payload) {
        state.items.forEach(item => {
            if (item.id == payload.id) {
                for (let field in payload.fields) {
                    item[field] = payload.fields[field];
                }
            }
        })
    },
    ESCAPE_EDIT_ITEM (state, payload) {
        state.items.forEach(item => {
            if (item.id == payload) item.edit = false;
        })
    },
    REMOVE_ITEM (state, payload) {
        state.items = state.items.filter(item => item.id != payload);
    }
}

const actions = {
    getItems ({commit}) {
        return Vue.http.get('db/notes.json')
            .then(response => response.json())
            .then(json => commit('LOAD_ITEMS', json))
            .catch(error => console.error(error));
    },
    addNote ({commit}, payload) {
        commit('ADD_ITEM', payload);
        commit('CLEAR_NEW_ITEM_FIELDS');
    },
    changeNewItemTitleField ({commit}, payload) {
        commit('CHANGE_NEW_ITEM_TITLE_FIELD', payload);
    },
    changeNewItemDescrField ({commit}, payload) {
        commit('CHANGE_NEW_ITEM_DESCR_FIELD', payload);
    },
    changeNewItemPriorityField ({commit}, payload) {
        commit('CHANGE_NEW_ITEM_PRIORITY_FIELD', payload);
    },
    changeItemTitleField ({commit}, payload) {
        commit('CHANGE_ITEM_TITLE_FIELD', payload);
    },
    changeItemDescrField ({commit}, payload) {
        commit('CHANGE_ITEM_DESCR_FIELD', payload);
    },
    clearFields ({commit}) {
        commit('CLEAR_FIELDS');
    },
    editItem ({commit}, payload) {
        commit('EDIT_ITEM', payload.id);
        // commit('CHANGE_ITEM_TITLE_FIELD', payload.title);
        // commit('CHANGE_ITEM_DESCR_FIELD', payload.descr);
    },
    updateItem ({commit}, payload) {
        commit('UPDATE_ITEM', payload);
    },
    escapeEditItem ({commit}, payload) {
        commit('ESCAPE_EDIT_ITEM', payload);
    },
    removeItem ({commit}, payload) {
        commit('REMOVE_ITEM', payload);
    }
}

const getters = {
    filterItems: state => search => search ? state.items.filter(item => item.title.toLowerCase().indexOf(search) !== -1) : state.items,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}