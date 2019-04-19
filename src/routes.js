import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import Home from '@/pages/Home.vue'
import Example from '@/pages/Example.vue'
import Note from '@/pages/Note.vue'
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
            path: '/example',
            name: 'example',
            component: Example
        },
        {
            path: '/note/:id',
            name: 'note',
            component: Note,
            props: true
        },
        {
            path: '*',
            name: '404',
            component: NotFound
        }
    ]
})