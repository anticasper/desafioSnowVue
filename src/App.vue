<template>
  <v-app>
    <!-- <v-expand-x-transition> -->
    <router-view />
    <!-- </v-expand-x-transition> -->
  </v-app>
</template>

<script>
  import { facebookSdk, getLoginStatus } from './plugins/helpers.js'
  export default {
    name: 'DesafioSnow',
    data: () => ({
      appId: '330229351529031',
      version: 'v2.9'
    }),
    methods: {
      start() {
        const user = localStorage.getItem('user')
        if (user) {
          this.$router.push({ path: '/Home' })
          this.$store.dispatch('setUserInfo', {
            user: user
          })
        } else {
          this.$router.push({ path: '/' })
          this.$store.commit('setUser', null)
        }
      }
    },
    mounted() {
      this.start()
      facebookSdk(this.appId, this.version)
        .then(loadingResult => {
          console.log(loadingResult)
        })
        .then(() => getLoginStatus())
        .then(response => {
          if (response.status === 'connected') {
            console.log(response)
            // this.isConnected = true
          }
          // this.isWorking = false
          // this.$emit('get-initial-status', response)
          // this.$emit('sdk-loaded', {
          //   isConnected: this.isConnected,
          //   FB: window.FB
          // })
        })
    }
  }
</script>

<style>
  #app {
    background: #efefff;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
