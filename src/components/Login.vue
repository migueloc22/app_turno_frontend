<template>
  <v-container color="#000">
    <form @submit.prevent="submit">
      <v-text-field
        v-model="form.email"
        :append-icon="mdi - close"
        placeholder="Email"
      ></v-text-field>
      <v-text-field
        v-model="form.passworld"
        :append-icon="mdi - close"
        placeholder="Contraseña"
      ></v-text-field>
      <v-btn text to="/user_register"> Registro </v-btn><br />
      <v-btn color="primary" @click="onSubmit"> Entrar </v-btn>
    </form>
  </v-container>
</template>

<script>
// import App from '../App.vue'
export default {
  //   components: { App },
  data() {
    return {
      form: {
        name: "",
        email: "",
        passworld: "",
        number_document: "",
        gender: "",
        birthday_date: "",
        fk_id_document_type: 0,
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      this.$store.dispatch('PostLogin', this.form).then(res=>{
        let token = ''
        token = res.data.access_token
        if(token.length>0)
        {
          this.$router.push('index')
        }

      })
    },
  },
};
</script>
<style lang="scss" scoped>
/* Define standard variables and values for website */
$bgcolor: lightblue;
$textcolor: darkblue;
$fontsize: 18px;

body {
  background-color: $bgcolor;
  color: $textcolor;
  font-size: $fontsize;
}
.v-card {
  margin-top: 15px;
}
.logo {
  margin: 20px auto;
}
</style>
