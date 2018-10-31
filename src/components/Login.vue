<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-8 login__wrapper">
                <form action="" class="form login__form">
                    <h2 class="title">Good to see you again!</h2>
                    <div class="form-group">
                        <input type="text" name="username" v-model="input.username" class="form-control" required />
                        <label for="username" class="form-control-placeholder">Username</label>
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" v-model="input.password" class="form-control" required />
                        <label for="password" class="form-control-placeholder">Password</label>
                    </div>
                    <div class="form-errors" v-if="errorMessage" >
                        <div class="form-errors__icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="form-errors__message">
                            <p>{{ errorMessage }}</p>
                        </div>
                    </div>
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
import firebase from 'firebase'
import Loader from './ui/Loader'

export default {
	data() {
		return {
			input: {
				username: '',
				password: ''
			},
			errorMessage: '',
			loadingButton: false
		}
	},
	components: {
		Loader
	},
	methods: {
		validate() {
			this.errorMessage = ''
			if (this.input.username != '' && this.input.password != '') {
				this.loadingButton = true
				firebase
					.auth()
					.signInWithEmailAndPassword(this.input.username, this.input.password)
					.then(
						() => {
							this.$router.go({
								path: this.$router.path
							})
						},
						err => {
							this.loadingButton = false
							this.errorMessage = err.message
						}
					)
			} else {
				this.errorMessage = 'Please fill in the fields.'
			}
		}
	},
	watch: {
		input: {
			handler() {
				this.errorMessage = ''
			},
			deep: true
		}
	}
}
</script>

<style lang="scss" scoped>
.btn {
	position: relative;
}

.btn__text {
	display: block;
	position: relative;
	transition: all ease-in-out 0.3s;
	top: 0;
}
.btn__spinner {
	display: block;
	position: absolute;
	width: 25px;
	height: 25px;
	left: 0;
	right: 0;
	top: 65px;
	margin-left: auto;
	margin-right: auto;
	opacity: 0;
	border: 3px solid rgba(255, 255, 255, 0.3);
	border-radius: 50%;
	border-top-color: #fff;
	animation: spin 1s ease-in-out infinite;
	-webkit-animation: spin 1s ease-in-out infinite;
	transition: all ease-in-out 0.3s;
}

.btn--loading {
	.btn__text {
		top: -50px;
	}
	.btn__spinner {
		top: 19px;
		opacity: 1;
	}
}

@keyframes spin {
	to {
		-webkit-transform: rotate(360deg);
	}
}
@-webkit-keyframes spin {
	to {
		-webkit-transform: rotate(360deg);
	}
}
</style>
