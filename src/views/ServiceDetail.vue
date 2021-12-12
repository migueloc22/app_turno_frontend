<template>
  <div>
    <NavBar title="Detalle Servicio" />
    <v-tabs
      v-model="tab"
      background-color="primary accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        Recents
        <v-icon>mdi-account-box</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Favorites
        <v-icon>mdi-message-text</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :value="'tab-1'">
        <ServiceDetail />
      </v-tab-item>
      <v-tab-item :value="'tab-2'">
        <CommentAdd />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import CommentAdd from "../components/CommentAdd.vue";
import ServiceDetail from "../components/ServiceDetail.vue";
export default {
  components: {
    NavBar,
    CommentAdd,
    ServiceDetail,
  },
  data() {
    return {
      tab: null,
    };
  },
};
</script>

<style></style>
