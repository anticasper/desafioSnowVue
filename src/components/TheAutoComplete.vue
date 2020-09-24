<template>
  <v-card width="250" class="ma-2 search" v-show="initial">
    <v-autocomplete
      hide-details
      dense
      solo
      item-text="name"
      item-value="id"
      prepend-inner-icon="mdi-magnify"
      append-icon="mdi-plus"
      placeholder="Search Here"
      @click:append="markF()"
      :items="markers"
    >
      <template v-slot:item="{ item }">
        <div style="width:100%; height:100%;" @click="goToF(item.index)">
          <v-row justify="center" align="center">
            <v-col cols="2"
              ><v-avatar size="32"><img v-if="item.img" :src="item.img"/></v-avatar
            ></v-col>
            <v-col
              ><h5>
                <b>{{ item.name }}</b>
              </h5>
              <h5>{{ item.neighbourhood }} {{ item.city }} {{ item.country }}</h5></v-col
            >
          </v-row>
        </div>
      </template>
    </v-autocomplete>
  </v-card>
</template>

<script>
  export default {
    name: 'TheAutoComplete',
    props: {
      initial: Boolean,
      markers: Array,
      mark: { type: Function },
      goTo: { type: Function }
    },
    methods: {
      markF() {
        this.$emit('markF')
      },
      goToF(index) {
        this.$emit('goTo', index)
      }
    }
  }
</script>

<style></style>
