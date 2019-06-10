import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
import 'firebase/database'
import { eventsRef } from './firebase'

Vue.use(Vuex, firebase)

const state = {
  selectedConcert: {
    details: {
      type: 'concert',
      title: '',
      location: '',
      url: '',
      date: '',
      status: 'interested',
      soldout: false
    },
    status: {
      mode: 'new',
      concertKey: ''
    }
  },
  concerts: [],
  showModal: false,
  filterStatus: false,
  isLoggedIn: false
}

const getters = {
  allConcerts (state) {
    return state.concerts.sort((a, b) => new Date(a.event.details.date) - new Date(b.event.details.date))
  },
  upcomingConcerts (state) {
    let list = state.concerts
      .filter(concert => {
        let date = new Date()
        date.setDate(date.getDate() - 1)
        return new Date(concert.event.details.date) > date
      })
      .sort((a, b) => new Date(a.event.details.date) - new Date(b.event.details.date))
    if (state.filterStatus) {
      return list.filter(concert => {
        return concert.event.details.status === 'going'
      })
    } else {
      return list
    }
  },
  concertArchive () {
    let list = state.concerts
      .filter(concert => {
        let date = new Date()
        date.setDate(date.getDate() - 1)
        return new Date(concert.event.details.date) < date
      })
      .sort((a, b) => new Date(a.event.details.date) - new Date(b.event.details.date))
      .reverse()
    if (state.filterStatus) {
      return list.filter(concert => {
        return concert.event.details.status === 'going'
      })
    } else {
      return list
    }
  },
  formatted () {
    let newArray = state.concerts
      .filter(concert => {
        let date = new Date()
        date.setDate(date.getDate() - 1)
        return concert.event.details.status === 'going' && new Date(concert.event.details.date) > date
      })
      .sort((a, b) => new Date(a.event.details.date) - new Date(b.event.details.date))
      .map(concert => {
        const datum = new Date(concert.event.details.date)
        const day = ('0' + datum.getDate()).slice(-2)
        const month = ('0' + (datum.getMonth() + 1)).slice(-2)

        const string = `${day}/${month} - ${concert.event.details.title} @ ${concert.event.details.location}`
        return string
      })

    return newArray.join('\n')
  },
  concertsByMonth () {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let concertsByMonth = {}

    for (let i = 0; i <= 11; i++) {
      concertsByMonth[i] = {
        month: months[i],
        counter: 0,
        events: [] }
    }

    state.concerts.forEach((concert) => {
      let formatedDate = new Date(concert.event.details.date)
      if (formatedDate.getFullYear() === new Date().getFullYear()) {
        concertsByMonth[formatedDate.getMonth()].counter++
        concertsByMonth[formatedDate.getMonth()]['events'].push(concert.event)
      }
    })

    return concertsByMonth
  }
}

const mutations = {
  updateEventInfo (state, event) {
    state.selectedConcert.details = { ...event.event.details }
    state.selectedConcert.status = {
      mode: 'update',
      concertKey: event.key
    }
  },
  updateDate (state, payload) {
    state.selectedConcert.details.date = payload
  },
  changeState (state, { target, value }) {
    state[target] = value
  }
}

const actions = {
  addEvent (context, event) {
    eventsRef.push({ event })
  },
  setConcerts ({ commit }, concerts) {
    commit('changeState', {
      target: 'concerts',
      value: concerts
    })
  },
  removeConcert (context, eventKey) {
    eventsRef.child(eventKey).remove()
  },
  setUpdatedConcert ({ commit }, event) {
    commit('updateEventInfo', event)
  },
  updateEvent (context, event) {
    eventsRef.child(event.status.concertKey).update({ event })
  },
  clearForm ({ commit }) {
    const emptyForm = {
      details: {
        type: 'concert',
        title: '',
        location: '',
        url: '',
        date: '',
        status: 'interested',
        soldout: false
      },
      status: {
        mode: 'new',
        concertKey: ''
      }
    }
    commit('changeState', {
      target: 'selectedConcert',
      value: emptyForm
    })
  },
  displayModal ({ commit }) {
    commit('changeState', {
      target: 'showModal',
      value: true
    })
  },
  hideModal ({ commit }) {
    commit('changeState', {
      target: 'showModal',
      value: false
    })
  },
  setLoginStatus ({ commit }, val) {
    commit('changeState', {
      target: 'isLoggedIn',
      value: val
    })
  }
}

export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
