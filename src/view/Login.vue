<template>
  <div class="column is-4 is-offset-4 is-paddingless">
    <section class="hero is-fullheight">
      <div class="hero-heading title">
        <div class="section has-text-centered has-text-primary">
          <span class="icon is-large">
            <i class="fa fa-eercast"></i>
          </span>
          SERVICES PORTAL
        </div>
      </div>
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-8 is-offset-2">
              <h1 class="avatar has-text-centered section">
                <img src="data:image/jpeg;base64,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">
              </h1>
              <div class="login-form">
                <form @submit.prevent="login()">
                  <p class="control has-icon has-icon-right">
                    <input class="input email-input" type="text" placeholder="Your username" v-model="user.username" autocomplete="off" @focus="$event.target.select()">
                    <span class="icon user">
                      <i class="fa fa-user"></i>
                    </span>
                  </p>
                  <p class="control has-icon has-icon-right">
                    <input class="input password-input" type="password" placeholder="●●●●●●●" v-model="user.password" autocomplete="off" @focus="$event.target.select()">
                    <span class="icon user">
                      <i class="fa fa-lock"></i>
                    </span>
                  </p>
                  <p class="control login">
                    <button type="submit" class="button is-primary is-large is-fullwidth">Login</button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-footer">
        <br/>
        <br/>
      </div>
    </section>
  </div>
</template>
<script>
import AuthProvider from '@/providers/auth'

export default {
  name: 'login',
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  created() { },
  methods: {
    login() {
      AuthProvider.login(this.user).then(vl => {
        this.$router.push('/coin/market')
      })
    }
  }
}
</script>

<style scoped>
html,
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  height: 100%;
  padding: 0;
  margin: 0;
}

.login-form .icon {
  width: 2.6em;
  height: 2.6em;
}

.email-input,
.password-input {
  border-radius: 40px;
  font-size: 20px;
  padding-left: 15px;
  margin: 4px;
}

.icon.user,
.icon.password {
  margin: 5px 10px 0 0;
}

.avatar img {
  border-radius: 100%;
  padding: 5px;
  border: 1px solid #dbdbdb;
}

.login {
  padding-top: 20px;
}

button {
  border-radius: 40px;
  font-weight: bold;
}
</style>
