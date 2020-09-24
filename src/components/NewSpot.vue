<template>
  <div>
    <v-text-field outlined label="Name" v-model="spot.name"></v-text-field>
    <v-select v-model="spot.category" :items="categories" label="Categories" outlined></v-select>
    <v-text-field outlined label="About" v-model="spot.about"></v-text-field>
    <v-text-field outlined label="Location" v-model="spot.location"></v-text-field>
    <v-text-field outlined label="PinColor" v-model="spot.color">
      <template v-slot:append>
        <v-icon :color="spot.color">mdi-circle</v-icon>
      </template>
    </v-text-field>
  </div>
</template>

<script>
  export default {
    name: 'NewSpot',
    props: {
      spot: Object,
      categories: Array
    }
  }
</script>

<style></style>
