import Vue from 'vue'
import VueRouter from 'vue-router'
import Agenda from './components/agenda/Agenda.vue'
import Archive from './components/agenda/Archive.vue'
import Login from './components/Login.vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import NProgress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: Agenda
  },
  {
    path: '/',
    component: Agenda,
    name: 'agenda'
  },
  {
    path: '/archive',
    component: Archive,
    name: 'archive'
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  }
]

let router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'navigation__link--active',
  base: process.env.environment === 'production' ? '/musicdash/' : '/'
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let requiresGuest = to.matched.some(record => record.meta.requiresGuest)

  if (requiresAuth && !currentUser) {
    next('login')
  } else if (requiresGuest && currentUser) {
    next('/')
  } else {
    next()
  }
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
    NProgress.configure({
      showSpinner: false
    })
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
