<template>
  <app>
    <NavBar title="Registro" />
    <v-content>
      <v-container>
        <v-card elevation="2" outlined>
          <v-container>
            <FormRegister />
          </v-container>
        </v-card>
      </v-container>
    </v-content>
  </app>
</template>

<script>
import FormRegister from "../components/FormRegisterUser.vue";
import NavBar from "../components/NavBar.vue";
export default {
  components: {
    FormRegister,
    NavBar
  },
  data() {
    return {
      form: {
        email: "",
        pass: "",
      },
    };
  },
};
</script>

<style>
</style>