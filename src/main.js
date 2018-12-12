import './firebase'
import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import firebase from 'firebase'
import router from './router'
import { store } from './store'
import './assets/scss/main.scss'

import '../node_modules/nprogress/nprogress.css'

window.moment = require('moment')

Vue.config.productionTip = false

Vue.use(VueFire)

let app
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
