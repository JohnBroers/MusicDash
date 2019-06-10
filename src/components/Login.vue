<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 login__wrapper">
        <form action="" class="form login__form" v-on:submit.prevent="validate()">
          <h2 class="title">Good to see you again!</h2>
          <div class="form-group">
            <input v-validate="'required|email'" data-vv-delay="1000" type="text" name="username" v-model="input.username" class="form-control" required />
            <label for="username" class="form-control-placeholder">Username</label>
          </div>
          <div class="form-group">
            <input v-validate="'required'" type="password" name="password" v-model="input.password" class="form-control" required />
            <label for="password" class="form-control-placeholder">Password</label>
          </div>
          <transition name="fade">
            <div class="form-errors" v-if="errors.all().length > 0 || errorMessage">
              <ul class="form-errors__list">
                <li v-if="errorMessage" class="form-errors__list__item"><i class="fas fa-exclamation-triangle"></i> {{ errorMessage }}</li>
                <li v-for="error in errors.all()" :key="error.id" class="form-errors__list__item"><i class="fas fa-exclamation-triangle"></i> {{ error }}</li>
              </ul>
            </div>
          </transition>
          <div class="form-group">
            <button type="button" class="btn btn-large btn-primary" :class="{'btn--loading' : loadingButton}" @click="validate()">
              <span class="btn__text">Login</span>
              <span class="btn__spinner" id="loading"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data () {
    return {
      input: {
        username: '',
        password: ''
      },
      errorMessage: '',
      loadingButton: false
    }
  },
  methods: {
    validate () {
      this.$validator.validate().then(valid => {
        if (valid) {
          this.errorMessage = ''
          if (this.input.username !== '' && this.input.password !== '') {
            this.loadingButton = true
            firebase.auth().signInWithEmailAndPassword(this.input.username, this.input.password)
              .then(
                () => {
                  this.$router.go({
                    name: 'agenda'
                  })
                },
                err => {
                  this.loadingButton = false
                  this.errorMessage = err.message
                }
              )
          }
        }
      })
    }
  },
  watch: {
    input: {
      handler () {
        this.errorMessage = ''
      },
      deep: true
    }
  }
}
</script>
