// Default
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Pages
import Home from '@/pages/Home'
import NotFound from '@/pages/404'
import HomeWork2 from '@/pages/HomeWork2'

// Routering
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home-work-2',
            name: 'home-work-2',
            component: HomeWork2
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
        }
    ]
})