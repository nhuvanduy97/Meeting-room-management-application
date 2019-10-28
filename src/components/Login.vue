<template>
  <div class="my-login">
    <div class="login-form">
      <div class="title-login">
        <h1 class="sign-in">Sign in</h1>
      </div>
      <br />
      <div class="login-input">
        <b-form-group>
          <div>
            <b-form-input v-model="username" class="form-input" type="text" placeholder="Username"></b-form-input>
          </div>
          <div class="password">
            <b-form-input v-model="password" class="form-input" type="password" placeholder="Password"></b-form-input>
          </div>
          <div class="btn-submit">
            <b-button variant="primary" @click="login">Login</b-button>
          </div>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data (){
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login(){
      console.log("username", this.username)
      console.log("password", this.password)
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/login',
        data: {
          username: this.username,
          password: this.password
        }
      }).then((res) =>{
        console.log(res)
      })
    }
  }
};
</script>

<style lang="scss">
.my-login {
  background-image: url("../assets/log_in_background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: -125px;
  height: 100%;
  color: #605d5e;
  font-family: "Ubuntu", sans-serif;
  .login-form {
    position: absolute;
    width: 500px;
    right: 140px;
    top: 100px;
    .title-login {
      display: flex;
      justify-content: center;
    }
    .sign-in {
      font-size: 60px;
      font-weight: bold;
    }
    .login-input {
      display: flex;
      justify-content: center;
    }
    .form-input {
      width: 300px;
    }
    .btn-submit {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
    .password {
      margin-top: 20px;
    }
    .btn-primary {
      width: 100px;
      border: none;  
    }
  }
}
</style>