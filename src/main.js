import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import store from './store'

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7Llxf04_uzv3Lvdl5o0azGn5WlusabTE',
    libraries: 'places,drawing,visualization'
  }
})
