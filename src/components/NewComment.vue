<template>
  <div>
    <v-container>
      <h5>New Comment</h5>
      <h5>Rate</h5>
      <p>
        <v-icon color="#10159a" @click="setStarF(i)" v-for="i in stars" :key="i">mdi-star</v-icon>
        <v-icon color="#10159a" @click="setStarF(i + stars)" v-for="i in 5 - stars" :key="i"
          >mdi-star-outline</v-icon
        >
      </p>
      <v-textarea
        label="Comment"
        auto-grow
        outlined
        rows="5"
        row-height="15"
        v-model="comment"
      ></v-textarea>
      <v-btn color="#ffcc00" block style="color:#10159a;" depressed @click="addCommentF()">
        <b>Comment </b>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'NewComment',
    props: {
      spot: Object,
      user: Object,
      stars: Number,
      addComment: Function,
      setStar: Function
    },
    data: () => ({
      comment: ''
    }),
    methods: {
      addCommentF() {
        const newComment = { name: this.user.name, stars: this.stars, text: this.comment }
        this.spot.comments.push(newComment)
        this.setStarF(0)
        this.comment = ''
        this.$emit('addComment')
      },
      setStarF(index) {
        this.$emit('setStar', index)
      }
    }
  }
</script>

<style></style>
