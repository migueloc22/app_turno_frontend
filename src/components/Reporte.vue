<template>
  <div>
    <v-card>
      <v-row>
        <v-col>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="dates"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dates"
                label="Picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dates" no-title scrollable range locale="es">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(dates)"> OK </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn block color="primary" @click="onFilter()"> Filtrar </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      dates: null,
    };
  },
  methods: {
    onFilter() {
        console.log(this.dates)
      this.$store.dispatch("ReporteEmpleado", {
        fecha_ini: this.dates[0],
        fecha_final: this.dates[1],
      });
    },
  },
};
</script>

<style></style>
