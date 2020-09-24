<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col>
        <v-card width="400" class="mx-auto my-auto pa-5 text-center">
          <img src="@/assets/logo.png" />
          <SnowButton
            text="Sign in with Facebook"
            class="my-2"
            icon="mdi-facebook"
            @click="login()"
          />
          <SnowButton
            :outlined="false"
            :dark="true"
            text="Sign Up with Facebook"
            class="my-2"
            icon="mdi-facebook"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { fbLogin } from '../plugins/helpers.js'
  import SnowButton from '@/components/sn-button'
  export default {
    name: 'Login',
    components: {
      SnowButton
    },
    data: () => ({}),
    methods: {
      login() {
        this.isWorking = true
        fbLogin().then(async response => {
          if (response.status === 'connected') {
            this.me()
          } else {
            // this.isConnected = false
          }
        })
      },
      me() {
        window.FB.api('/me', response => {
          let user = response
          user.places = []
          localStorage.setItem('user', JSON.stringify(user))
          this.$router.push({ path: '/Home' })
        })
      }
    },
    mounted() {}
  }
</script>

<style></style>
