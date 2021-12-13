<template>
  <app>
    <form>
      <v-text-field
        v-model="form.name"
        :error-messages="nameErrors"
        :counter="10"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="form.email"
        :error-messages="emailErrors"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="form.passworld"
        :type="'password'"
        name="input-10-1"
        label="Contraseña"
        hint="At least 8 characters"
        counter
      ></v-text-field>
      <v-select
        v-model="form.fk_id_document_type"
        :items="data_document_type"
        :error-messages="fk_id_document_typeErrors"
        label="Tipo de Documento"
        item-text="name"
        item-value="id"
        required
      ></v-select>
      <v-text-field
        v-model="form.number_document"
        :error-messages="number_documentErrors"
        label="Numero Documento"
        required
      ></v-text-field>
      <v-text-field
        :type="'date'"
        v-model="form.birthday_date"
        :error-messages="birthday_dateErrors"
        :counter="10"
        label="Fecha Nacimiento"
        required
      ></v-text-field>
      <v-select :items="genders" v-model="form.genders" label="Genero"></v-select>
      <v-btn class="mr-4" @click="onSubmit"> Guardar </v-btn>
      <v-btn type="reset" color="error"> Limpiar </v-btn>
    </form>
  </app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        passworld: "",
        number_document: "",
        gender: "",
        birthday_date: "",
        fk_id_document_type: [],
      },
      genders: ["Masculino", "Femenino"],
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      // alert(JSON.stringify(this.form));
      this.$store.dispatch("PostUser", this.form);
      this.form;
      this.form.name = "";
      this.form.email = "";
      this.form.passworld = "";
      this.form.number_document = "";
      this.form.gender = "";
      this.form.birthday_date = "";
      this.$swal("Felicitaciones", "El Usuario guardó correctamente", "success");
    },
    onReset() {
      return null;
    },
  },
  mounted() {
    this.$store.dispatch("ServicioDocumenType");
  },
  computed: {
    ...mapState(["data_document_type"]),
  },
};
</script>

<style></style>
