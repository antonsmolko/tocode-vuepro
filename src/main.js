import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

import store from './store'

import './assets/scss/main.scss'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
