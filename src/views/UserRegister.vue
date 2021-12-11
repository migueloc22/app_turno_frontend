<template>
  <app>
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
export default {
  components: {
    FormRegister,
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