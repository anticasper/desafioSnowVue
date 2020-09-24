<template>
  <div :class="css">
    <v-btn
      x-large
      :outlined="outlined"
      block
      :color="color"
      :dark="dark"
      class="text-left"
      width="auto"
      @click="action()"
      ><b
        ><v-icon :dark="dark" class="mx-2">{{ icon }}</v-icon
        >{{ text }}</b
      ></v-btn
    >
  </div>
</template>

<script>
  export default {
    name: 'SnowButton',
    props: {
      color: {
        type: String,
        default: '#0D47A1'
      },
      text: {
        type: String,
        required: true
      },
      dark: {
        type: Boolean,
        default: false
      },
      outlined: {
        type: Boolean,
        default: true
      },
      icon: {
        type: String
      },
      click: {},
      css: {}
    },
    data: () => ({}),
    methods: {
      action() {
        this.$emit('click')
      }
    }
  }
</script>
