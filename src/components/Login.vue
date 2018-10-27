<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-8 login__wrapper">
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
                        <button type="button" class="btn btn-large btn-primary" @click="validate()">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    data() {
        return {
            input: {
                username: "johnbroers93@gmail.com",
                password: "testtest"
            },
            errorMessage: ""
        }
    },
    methods: {
        validate() {
            this.errorMessage = ""
            if(this.input.username != "" && this.input.password != "") {
                firebase.auth().signInWithEmailAndPassword(this.input.username, this.input.password).then(
                    (user) => {
                        this.$router.go({
                            path: this.$router.path
                        });
                        console.log(`User logged in: ${user.user.email}`);
                    },
                    (err) => {
                        console.log(err.message);
                        this.errorMessage = err.message;
                    }
                )
            } else {
                console.log('Please fill in the fields.');
                this.errorMessage = "Please fill in the fields."
            }
        }
    },
    watch: {
        input: {
            handler(val) {
                this.errorMessage = "";
            },
            deep: true
        }
    }
}
</script>
