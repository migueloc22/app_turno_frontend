import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/user_register",
    name: "user_register",
    component: () =>
      import(
        /* webpackChunkName: "user_register" */ "../views/UserRegister.vue"
      ),
  },
  {
    path: "/servie_detail/:id",
    name: "servie_detail",
    component: () =>
      import(
        /* webpackChunkName: "servie_detail" */ "../views/ServiceDetail.vue"
      ),
  },
  {
    path: "/index",
    name: "index",
    component: () =>
      import(
        /* webpackChunkName: "index" */ "../views/Index.vue"
      ),
  },
  {
    path: "/turn_add",
    name: "turn_add",
    component: () =>
      import(
        /* webpackChunkName: "turn_add" */ "../views/TurnAdd.vue"
      ),
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
