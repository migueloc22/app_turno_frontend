<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.address"
              label="Dirreción"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="form.number_plate"
              label="Numero Placa"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.date"
              label="Fecha"
              type="date"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select :items="horas" v-model="form.hora" label="Hora"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              :items="data_turn_type"
              v-model="form.fk_id_turn_type"
              label="Tipo Servicio"
              item-text="name"
              item-value="id"
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              :items="data_mechanical"
              v-model="form.fk_id_mechanical_user"
              label="Mecanico"
              item-text="name"
              item-value="id"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-textarea
            v-model="form.observation"
            auto-grow
            filled
            label="Observación"
            rows="5"
          ></v-textarea>
        </v-row>
        <v-card-actions>
          <v-btn text color="black accent-4" @click="onSubmit"> Guardar </v-btn>
          <v-btn text color="red accent-4" type="reset"> Limpiar </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        address: "",
        number_plate: "",
        observation: "",
        date: "",
        hora: "",
        fk_id_turn_type: 0,
        fk_id_client_user: 0,
        fk_id_mechanical_user: 0,
      },
      horas: [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
      ],
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      // alert(JSON.stringify(this.form));
      this.form.fk_id_client_user = parseInt(localStorage.user_id)
      this.$store.dispatch("PostTurn", this.form).then(res=>{
        console.log(res)
        this.$swal("Se agrego con exito");
        this.$router.push('index')
      })
    },
  },

  mounted() {
    this.$store.dispatch("Get_mechanical");
    this.$store.dispatch("Get_turn_type");
  },
  computed: {
    ...mapState(["data_mechanical", "data_turn_type"]),
  },
};
</script>

<style></style>
