<template>
  <v-card v-show="!initial" width="400" class="spotInfo scroll" height="80%">
    <div v-show="state === 'info'">
      <TheSpot :spot="spot" :user="user" @changeState="setStatusF" />
    </div>
    <div v-show="state === 'comment'">
      <NewComment
        :spot="spot"
        :stars="stars"
        :user="user"
        @setStar="setStarF"
        @addComment="addComment"
      />
    </div>
    <div v-show="state === 'newSpot'">
      <div class="image-header" v-show="imageData">
        <img :src="imageData" width="100%" />
      </div>
      <v-container>
        <slot></slot>
        <NewSpot :spot="spot" :categories="categories" />
        <v-btn color="#ffcc00" block style="color:#10159a;" depressed @click="addSpot()">
          <b>Add Spot </b>
        </v-btn>
      </v-container>
    </div>
  </v-card>
</template>

<script>
  import TheSpot from './TheSpot'
  import NewSpot from './NewSpot'
  import NewComment from './NewComment'
  export default {
    name: 'TheInfo',
    components: {
      TheSpot,
      NewSpot,
      NewComment
    },

    props: {
      initial: Boolean,
      state: String,
      spot: Object,
      markers: Array,
      user: Object,
      stars: Number,
      imageData: String,
      categories: Array,
      updateMarkerInfo: Function,
      chooseImage: Function,
      onSelectFile: Function,
      changeState: Function,
      changeSpot: Function,
      setStar: Function
    },
    methods: {
      addSpot() {
        const spot = this.markers[this.markers.length - 1]
        spot.index = this.markers.length - 1
        spot.img = this.imageData
        spot.name = this.spot.name
        spot.username = this.user.name
        spot.neighbourhood = this.spot.location
        spot.city = ''
        spot.contry = ''
        spot.category = this.spot.category
        spot.about = this.spot.about
        this.$emit('changeState', 'info')
        this.$emit('changeSpot', spot)
        this.$emit('updateMarkerInfo')
      },
      addComment() {
        this.setStatusF('info')
        this.$emit('updateMarkerInfo')
      },
      setStarF(star) {
        // this.setStatusF('info')
        this.$emit('setStar', star)
      },
      setStatusF(status) {
        this.$emit('changeState', status)
      }
    }
  }
</script>
