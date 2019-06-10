<template>
    <header class="header">
        <div class="container">
        <router-link :to="{name: 'agenda'}" class="logo">
            <h1>Music<span>Dash.</span></h1>
        </router-link>
        <nav>
            <ul class="navigation">
                <li class="navigation__item">
                    <router-link to="/" class="navigation__link">Agenda</router-link>
                </li>
                <li class="navigation__item">
                    <router-link to="/archive" class="navigation__link">Archive</router-link>
                </li>
                <li v-if="!isLoggedIn" class="navigation__item">
                    <router-link to="/login" class="navigation__link">Login</router-link>
                </li>
                <li v-if="isLoggedIn" class="navigation__item">
                    <a href="#" @click.prevent="logout()" class="navigation__link">Logout</a>
                </li>
            </ul>
        </nav>
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  methods: {
    logout () {
      firebase.auth().signOut()
        .then(() => {
          this.$router.go({
            name: 'agenda'
          })
        })
    }
  }
}
</script>
