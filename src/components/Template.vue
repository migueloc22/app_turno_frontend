<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="primary--text text--accent-4">
          <v-card dark>
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                alt=""
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>
            <v-card-title class="text-h5"> {{ name }} </v-card-title>

            <!-- <v-card-subtitle
              >Listen to your favorite artists and albums whenever and wherever,
              online and offline.</v-card-subtitle
            > -->

            <v-card-actions>
              <v-btn text @click="onclose"> Close </v-btn>
            </v-card-actions>
          </v-card>
          <div v-for="(item, index) in list" :key="index">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content style="top: 40px">
      <!--  -->
      <v-container grid-list-xs>
        <Agenda v-if="user_type!=2" />
        <Reporte v-else-if="user_type==2"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Agenda from "./Agenda.vue";
import Reporte from "./Reporte.vue";
import { mapState } from "vuex";
export default {
  components: { Agenda,Reporte },
  data: () => ({
    drawer: false,
    group: null,
    list: [],
    name: "",
    user_type: localStorage.user_type,
  }),
  methods: {
    init() {
      let type = "";
      if (!this.$store.state.token) {
        this.$router.push('/')
      }
      // type = localStorage.getItem('user_type')
      this.name = localStorage.getItem("user_name");
      type = this.user_type;
      switch (type) {
        case 1:
          this.list = [
            { title: "Home", icon: "mdi-home", page: "index" },
            { title: "Account", icon: "mdi-account", page: "index" },
          ];
          break;
        case 2:
          this.list = [
            { title: "Home", icon: "mdi-home", page: "index" },
            { title: "Account", icon: "mdi-account", page: "index" },
          ];
          break;
        case 3:
          this.list = [
            { title: "Home", icon: "mdi-home", page: "index" },
            { title: "Account", icon: "mdi-account", page: "index" },
          ];
          break;

        default:
          break;
      }
    },
    onclose(){
      this.$store.dispatch("logout")
      this.$router.push('/')
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState(["state"]),
  },
};
</script>

<style></style>
