<template>
  <v-container>
    <center>
      <h1>Detalle de servicio</h1>
    </center>
    <v-card>
      <v-card-title primary-title>Servicio # {{ detail.id }} </v-card-title>
      <v-card-text>
        <v-row>
          <v-card-title primary-title>Cliente : {{ detail.name_client }}</v-card-title>
        </v-row>
        <v-row>
          <v-card-title primary-title
            >Mecanico: {{ detail.name_mechanical }}</v-card-title
          >
        </v-row>
        <v-row>
          <v-card-title primary-title>Placa: {{ detail.number_plate }}</v-card-title>
        </v-row>
      </v-card-text>
      <v-card-subtitle> Observaciones: </v-card-subtitle>
      <v-card-text>{{ detail.observation }} </v-card-text>
      <v-btn v-if="user_type == 3" block color="error" @click="onFinalize">
        Finaliar Servicio
      </v-btn>
    </v-card>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      detail: {},
      snackbar: false,
      text: `Hello, I'm a snackbar`,
      user_type: localStorage.user_type,
    };
  },
  methods: {
    init() {
      this.$store
        .dispatch("Get_service_detail", { id: this.$route.params.id })
        .then((res) => {
          this.detail = res.data;
        });
    },
    onFinalize() {
      this.$swal({
        title: `¿Desea Finalizar El servicio ${this.$route.params.id} ?`,
        showCancelButton: true,
        confirmButtonText: "Ok",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          //   this.$router.push({ name: "servie_detail", params: { id: id } });
          this.$store
            .dispatch("PutTurnState", { id: this.$route.params.id, states: 2 })
            .then((res) => {
              this.detail = res.data;
              this.$swal("Servicio?", "El servicio se finalizó correctamente", "success");
              this.snackbar = true;
            });
        }
      });
    },
  },
  mounted() {
    this.init();
  },
  computed() {},
  ...mapState(["service_detail"]),
};
</script>

<style></style>
