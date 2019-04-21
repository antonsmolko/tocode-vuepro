import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import Home from '@/pages/Home.vue'
import Notify from '@/pages/Notify.vue'
import NotFound from '@/pages/NotFound.vue'

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/notify',
            name: 'notify',
            component: Notify
        },
        {
            path: '*',
            name: '404',
            component: NotFound
        }
    ]
})