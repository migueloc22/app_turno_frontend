<template>
  <div>
    <v-card class="mx-auto overflow-hidden">
      <v-app-bar color="primary" dark>
        <v-app-bar-nav-icon color="black" @click="regresar">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-app-bar-nav-icon>

        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-app-bar>
    </v-card>
  </div>
</template>

<script>
export default {
  props: { title: String },
  methods: {
    regresar() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
