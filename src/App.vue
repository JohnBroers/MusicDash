<template>
  <div id="app">
    <app-header />
    <router-view></router-view>
    <modal v-if="showModal" @close="showModal = false">
        <event-form></event-form>
    </modal>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import Modal from './components/Modal'
import EventForm from './components/EventForm'
import { mapActions, mapState } from 'vuex'
import firebase from 'firebase';

export default {
  name: 'app',
  components: {
    AppHeader,
    Modal,
    EventForm
  },
  computed: {
  ...mapState([
    'selectedConcert',
    'showModal'
  ])
  },
  methods: {
    ...mapActions([
        'fetchEvents',
        'setLoginStatus'
    ])
  },
  created() {
    this.fetchEvents();
    if(firebase.auth().currentUser) {
        this.setLoginStatus(true);
    }
  }
}
</script>


