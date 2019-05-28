import Vue from 'vue'
import App from './App.vue'
import { rtdbPlugin } from 'vuefire'
import VeeValidate from 'vee-validate'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import router from './router'
import { store } from './store'
import './assets/scss/main.scss'

import '../node_modules/nprogress/nprogress.css'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(rtdbPlugin)

Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

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
