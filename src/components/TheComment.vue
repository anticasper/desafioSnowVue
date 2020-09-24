<template>
  <div>
    <h5 class="username">
      <b>
        {{ comment.name }}
        <span style="color:#10159a;"
          ><v-icon small color="#10159a">mdi-star</v-icon>{{ comment.stars }}</span
        ></b
      >
    </h5>
    <p>
      <i> "{{ comment.text }}" </i>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'TheComment',
    props: {
      comment: {},
      user: {}
    }
  }
</script>

<style></style>
