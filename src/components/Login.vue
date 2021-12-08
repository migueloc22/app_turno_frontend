<template >
  <v-container color="#000">
    <form @submit.prevent="submit">
        <v-text-field :append-icon="mdi-close" placeholder="Email"></v-text-field>
    </form>
  </v-container>
</template>

<script>
// import App from '../App.vue'
export default {
  //   components: { App },
  data() {
      return {
          form:{
              email:'',
              pass:'',
          }
      }
  },
};
</script>

<style>
</style>