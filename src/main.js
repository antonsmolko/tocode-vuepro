import Vue from 'vue'
import App from './App.vue'

import './assets/scss/main.scss'

import router from './routes'
import store from './store'

Vue.config.productionTip = false

// Components
import Navbar from '@/components/Navbar.vue'

Vue.component('navbar', Navbar);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
