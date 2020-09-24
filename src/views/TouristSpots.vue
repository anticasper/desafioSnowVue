<template>
  <div>
    <TheHeader />
    <v-container>
      <GmapMap
        :center="{ lat: currentLocation.lat, lng: currentLocation.lng }"
        :zoom="17"
        :options="{ disableDefaultUI: true }"
        map-type-id="roadmap"
        style="width: auto; height: 800px; color: green;"
      >
        <template #visible>
          <TheAutoComplete :markers="markers" :initial="initial" @markF="mark" @goTo="goTo" />

          <GmapMarker
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="viewSpot($event, index)"
            @drag="updateCoordinates($event, m)"
            @mouseover="showInfo($event, m)"
            @mouseout="showToolTip = false"
            :key="index"
            v-for="(m, index) in markers"
          />

          <TheInfo
            :initial="initial"
            :state="state"
            :markers="markers"
            :spot="spot"
            :user="user"
            :stars="stars"
            :categories="categories"
            :imageData="imageData"
            @updateMarkerInfo="updateMarkerInfo"
            @changeState="changeState"
            @changeSpot="changeSpot"
            @setStar="setStar"
          >
            <div class="text-center pa-10">
              <v-btn icon @click="chooseImage()"
                ><v-icon large color="#111236">mdi-camera</v-icon></v-btn
              >
              <input type="file" class="hide" ref="fileInput" @input="onSelectFile()" />
            </div>
          </TheInfo>

          <v-btn
            color="white"
            depressed
            fab
            class="backButton pa-4"
            v-show="!initial"
            @click="back()"
          >
            <v-icon color="indigo" large flat>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
      </GmapMap>
    </v-container>
    <v-footer absolute>
      <v-container class="text-right">
        Diovanni Souza
      </v-container>
    </v-footer>
  </div>
</template>

<script>
  import TheAutoComplete from '../components/TheAutoComplete'
  import TheInfo from '../components/TheInfo'
  import TheHeader from '../components/TheHeader'
  export default {
    name: 'TouristSpots',
    components: {
      TheHeader,
      TheInfo,
      TheAutoComplete
    },
    data: () => ({
      categories: [
        'Historical sites',
        'Monuments',
        'Zoos',
        'Museums',
        'Art galleries',
        'Gardens',
        'Buildings and structures',
        'National parks and forests',
        'Thematic parks',
        'Historic trains',
        'Viewpoints'
      ],
      markers: [],
      currentLocation: { lat: 0, lng: 0 },
      initial: true,
      showToolTip: false,
      state: 'info',
      comment: '',
      imageData: '',
      spot: {},
      x: 0,
      y: 0,
      spotBase: {
        index: 0,
        username: '',
        name: '',
        neighbourhood: '',
        city: '',
        country: '',
        position: {
          lat: 0,
          lng: 0
        },
        category: '',
        about: '',
        comments: []
      },
      user: {},
      stars: 5
    }),
    methods: {
      changeState(state) {
        this.state = state
      },
      changeSpot(spot) {
        this.spot = spot
      },
      geolocation() {
        navigator.geolocation.getCurrentPosition(position => {
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      },
      mark() {
        const newSpot = {}
        this.spot = {}
        this.imageData = ''
        newSpot.comments = []
        navigator.geolocation.getCurrentPosition(position => {
          this.currentLocation.lat = position.coords.latitude
          this.currentLocation.lng = position.coords.longitude
          newSpot.position = { lat: position.coords.latitude, lng: position.coords.longitude }
          this.markers.push(newSpot)
        })
        this.state = 'newSpot'
        this.initial = false
      },
      viewSpot(mark, index) {
        this.state = 'info'
        this.currentLocation.lat = mark.latLng.lat
        this.currentLocation.lng = mark.latLng.lng
        this.initial = false
        this.spot = this.markers[index]
        this.spot.stars = this.calcStars(this.spot)
      },
      getMarkerInfo() {
        const markers = JSON.parse(localStorage.getItem('markers'))
        if (markers) {
          this.markers = markers
        }
      },
      updateCoordinates(location, m) {
        m.position = {
          lat: location.latLng.lat(),
          lng: location.latLng.lng()
        }
        this.updateMarkerInfo()
      },
      updateMarkerInfo() {
        const markers = this.markers
        localStorage.setItem('markers', JSON.stringify(markers))
      },
      showInfo($event) {
        this.x = $event.ub.x - $event.pixel.x
        this.y = $event.ub.y - $event.pixel.y
        this.showToolTip = true
      },
      back() {
        if (this.state === 'info') {
          this.initial = true
        } else if (this.state === 'comment') {
          this.state = 'info'
        } else if (this.state === 'newSpot') {
          this.initial = true
          this.state = 'info'
          this.spot = {}
          this.markers.pop()
        }
      },
      getUserInfo() {
        this.user = JSON.parse(localStorage.getItem('user'))
      },
      chooseImage() {
        this.$refs.fileInput.click()
      },
      onSelectFile() {
        const input = this.$refs.fileInput
        const files = input.files
        if (files && files[0]) {
          const reader = new FileReader()
          reader.onload = e => {
            this.imageData = e.target.result
          }
          reader.readAsDataURL(files[0])
          this.$emit('input', files[0])
        }
      },
      setStar(i) {
        this.stars = i
      },
      goTo(index) {
        const mark = this.markers[index]
        mark.latLng = {}
        mark.latLng.lat = mark.position.lat
        mark.latLng.lng = mark.position.lng
        this.viewSpot(mark, index)
      },
      setFavorite(index) {
        if (!this.user.places) {
          this.user.places = []
        }
        if (this.user.places.includes(index)) {
          this.user.places.splice(index, 1)
        } else {
          this.user.places.push(index)
        }
        localStorage.setItem('user', JSON.stringify(this.user))
      },
      calcStars(spot) {
        let result = 1
        let count = 0
        if (spot.comments) {
          spot.comments.forEach(element => {
            result += element.stars
            count++
          })
          if (count > 0) {
            const r = result / count
            return Math.floor(r)
          }
        }
        return result
      }
    },
    mounted() {
      this.getUserInfo()
      this.getMarkerInfo()
      this.geolocation()
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400&display=swap');
  .search,
  .spotInfo {
    position: absolute;
    top: 40px;
    left: 40px;
    font-family: 'Nunito', sans-serif;
  }
  .scroll {
    overflow-y: scroll;
  }
  .scroll::-webkit-scrollbar {
    width: 5px; /* width of the entire scrollbar */
  }
  .scroll::-webkit-scrollbar-track {
    background: #ffffff; /* color of the tracking area */
  }
  .scroll::-webkit-scrollbar-thumb {
    background-color: #cacbe8; /* color of the scroll thumb */
  }

  .image-header {
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .backButton {
    position: absolute;
    top: 40px;
    left: 460px;
    z-index: 100;
  }
  .spotInfo h3 {
    color: #111236;
    font-weight: bold;
    font-size: 1.2em;
  }
  h5 {
    color: #9697a3;
    font-weight: normal;
    font-size: 0.9em;
  }
  .username {
    color: #111236;
  }
  .hide {
    display: none;
  }
</style>
