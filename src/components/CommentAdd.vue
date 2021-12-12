<template>
  <v-container grid-list-xs>
    <v-card v-if="user_type == 3">
      <v-card-title primary-title> Agregar Comentario </v-card-title>
      <v-card-text>
        <v-row>
          <v-textarea
            v-model="form.observations"
            label="Agregar Comentario"
            auto-grow
            outlined
            rows="3"
            row-height="25"
            shaped
          ></v-textarea>
        </v-row>
        <v-row>
          <v-btn block color="primary" @click="onSend"> Enviar </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
    <center>
      <h1>Comentarios</h1>
    </center>
    <v-card>
      <v-list three-line>
        <template v-for="(item, index) in data_observation">
          <v-list-item :key="index">
            <v-list-item-avatar>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                >{{ item.name }} - # {{ item.date_creation }}
              </v-list-item-title>
              <v-list-item-action-text> {{ item.observations }} </v-list-item-action-text>
            </v-list-item-content>
          </v-list-item>

          <v-divider v-if="index < data_observation.length - 1" :key="index"></v-divider>
        </template>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      user_type: localStorage.user_type,
      form: {
        observations: "",
        fk_id_turn: parseInt(this.$route.params.id),
        fk_id_mechanical_user: parseInt(localStorage.user_id),
      },
    };
  },
  methods: {
    onSend() {
      this.$store.dispatch("PostObservation", this.form).then((res) => {
        this.detail = res.data;
        this.$store.dispatch("Get_observation", {
          id: this.$route.params.id,
        });
        this.form.observations = "";
        this.$swal("Felicitaciones", "El Comentario guardó correctamente", "success");
      });
    },
  },
  mounted() {
    this.$store.dispatch("Get_observation", {
      id: this.$route.params.id,
    });
  },
  computed: {
    ...mapState(["data_observation"]),
  },
};
</script>

<style></style>
