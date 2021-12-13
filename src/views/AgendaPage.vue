<template>
  <div>
    <NavBar title="Crear Turno" />
    <v-container grid-list-md>
      <ForTurn />
    </v-container>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import ForTurn from "../components/Agenda.vue";
export default {
  components: { NavBar, ForTurn },
};
</script>

<style></style>
