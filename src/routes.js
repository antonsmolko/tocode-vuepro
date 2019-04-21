import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import Search from '@/pages/Search.vue'
import Example from '@/pages/Example.vue'
import NotFound from '@/pages/NotFound.vue'

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'search',
            component: Search
        },
        {
            path: '/example',
            name: 'example',
            component: Example
        },
        {
            path: '*',
            name: '404',
            component: NotFound
        }
    ]
})