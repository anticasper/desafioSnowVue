<template>
  <v-app-bar color="indigo" dark>
    <v-container>
      <v-row justify="center" align="center">
        <v-col v-if="user"
          ><h3>
            Welcome <b>{{ user.name }}</b
            >! - Tourist Spots
          </h3></v-col
        >
        <v-col class="text-right"
          >Challenge <v-btn @click="logout()"> <v-icon>mdi-logout</v-icon></v-btn></v-col
        >
      </v-row>
    </v-container></v-app-bar
  >
</template>

<script>
  import { fbLogout } from '../plugins/helpers.js'
  export default {
    name: 'TheHeader',
    data: () => ({
      user: {}
    }),
    methods: {
      logout() {
        fbLogout()
        localStorage.clear()
        this.$router.push({ path: '/' })
      },
      getUserInfo() {
        this.user = JSON.parse(localStorage.getItem('user'))
      }
    },
    mounted() {
      this.getUserInfo()
    }
  }
</script>

<style></style>
