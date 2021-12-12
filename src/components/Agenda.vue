<template>
  <div>
    <v-container grid-list-xs>
      <center>
        <h1>Agenda</h1>
      </center>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Picker in menu"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable locale="es">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
                </v-date-picker>
              </v-menu>
              <v-card-actions>
                <v-btn block color="primary" @click="onSubmit()"> Filtrar </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-list three-line>
              <template v-for="(item, index) in data_agenda">
                <v-list-item :key="index" @click="onDetalle(item.id)">
                  <v-list-item-avatar>
                    <v-icon>mdi-motorbike-electric</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ item.name }} - # {{ item.id }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                      >Fecha {{ item.date }} {{ item.hora }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-divider
                    v-if="index < data_agenda.length - 1"
                    :key="index"
                  ></v-divider>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <v-btn
        v-if="user_type == 1"
        color="primary"
        dark
        absolute
        bottom
        right
        fab
        to="/turn_add"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      menu: false,
      date: "",
      user_type: localStorage.user_type,
    };
  },
  methods: {
    onSubmit() {
      console.log(this.date);
      if (this.date.length > 0) {
        switch (localStorage.user_type) {
          case "1":
            this.$store.dispatch("Get_turns_list", {
              id: localStorage.user_id,
              date: this.date,
            });
            break;
          case "3":
            this.$store.dispatch("Get_turns_agenda", {
              id: localStorage.user_id,
              date: this.date,
            });
            break;

          default:
            break;
        }
      }
    },
    onDetalle(id) {
      this.$swal({
        title: `¿Desea ver detalle #${id}?`,
        showCancelButton: true,
        confirmButtonText: "Ok",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.$router.push({ name: "servie_detail", params: { id: id } });
        }
      });
    },
  },
  mounted() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = `${yyyy}-${mm}-${dd}`;
    switch (localStorage.user_type) {
      case "1":
        this.$store.dispatch("Get_turns_list", {
          id: localStorage.user_id,
          date: today,
        });
        break;
      case "3":
        this.$store.dispatch("Get_turns_agenda", {
          id: localStorage.user_id,
          date: today,
        });
        break;

      default:
        break;
    }
  },
  computed: {
    ...mapState(["data_agenda"]),
  },
};
</script>

<style></style>
