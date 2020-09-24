<template>
  <div>
    <div class="image-header">
      <img :src="spot.img" width="100%" />
    </div>
    <v-container class="px-8">
      <v-row>
        <v-col cols="8">
          <h3>{{ spot.name }}</h3>
          <h5>{{ spot.neighbourhood }} {{ spot.city }} {{ spot.country }}</h5>
          <p>
            <v-icon color="#10159a" v-for="i in spot.stars" :key="i">mdi-star</v-icon>
          </p>
        </v-col>
        <v-col cols="4" class="text-right" v-if="user.places">
          <v-btn
            color="red"
            outlined
            fab
            tile
            small
            v-show="!user.places.includes(spot.index)"
            @click="setFavorite(spot.index)"
            ><v-icon>mdi-heart-outline</v-icon></v-btn
          >
          <v-btn
            color="red"
            outlined
            fab
            tile
            small
            v-show="user.places.includes(spot.index)"
            @click="setFavorite(spot.index)"
            ><v-icon>mdi-heart</v-icon></v-btn
          >
        </v-col>
      </v-row>

      <h5>Category</h5>
      <p>{{ spot.category }}</p>

      <h5>About</h5>
      <p>
        {{ spot.about }}
      </p>

      <v-row>
        <v-col cols="8">
          <h5>Comments</h5>
        </v-col>
        <v-col cols="4" class="text-right">
          <v-btn color="#10159a" outlined fab tile small @click="setStatusF('comment')"
            ><v-icon>mdi-chat-processing-outline</v-icon></v-btn
          >
        </v-col>
      </v-row>

      <div v-for="(item, key) in spot.comments" :key="key">
        <TheComment :comment="item" />
      </div>
    </v-container>
  </div>
</template>

<script>
  import TheComment from './TheComment'
  export default {
    name: 'TheSpot',
    components: {
      TheComment
    },
    props: {
      spot: Object,
      user: Object,
      changeState: Function
    },
    methods: {
      setFavorite(index) {
        if (!this.user.places) {
          this.user.places = []
        }
        if (this.user.places.includes(index)) {
          const i = this.user.places.indexOf(index)
          this.user.places.splice(i, 1)
        } else {
          this.user.places.push(index)
        }
        localStorage.setItem('user', JSON.stringify(this.user))
      },
      setStatusF(status) {
        this.$emit('changeState', status)
      }
    }
  }
</script>
