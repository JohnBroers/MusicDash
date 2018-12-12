<template>
  <div id="app">
    <app-header />
    <transition name="fade" mode="out-in">
		<router-view />
    </transition>
	<loader v-if="isLoading" />
    <modal v-if="showModal" @close="showModal = false">
        <event-form />
    </modal>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import Modal from './components/Modal'
import EventForm from './components/EventForm'
import Loader from './components/ui/Loader'

import { mapActions, mapState } from 'vuex'
import firebase from 'firebase'
import { eventsRef } from './firebase'

export default {
  name: 'app',
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    AppHeader,
    Modal,
    EventForm,
    Loader
  },
  computed: {
    ...mapState(['showModal'])
  },
  methods: {
    ...mapActions(['setConcerts', 'setLoginStatus']),
    getEvents () {
      this.isLoading = true
      eventsRef.on('value', snapshot => {
        const concertList = []
        snapshot.forEach(childSnapshot => {
          const concert = childSnapshot.val()
          concert.key = childSnapshot.key
          concertList.push(concert)
        })
        this.isLoading = false
        this.setConcerts(concertList)
      })
    }
  },
  created () {
    this.getEvents()
    if (firebase.auth().currentUser) {
      this.setLoginStatus(true)
    }
  }
}
</script>
