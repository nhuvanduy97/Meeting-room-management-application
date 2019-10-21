import Vue from "vue";
import VueRouter from "vue-router";
// import Content from "../views/Content.vue";
import Calendar from "../components/Calendar.vue"
import Container from "../views/index.vue"
import Login from "../components/Login.vue"
import Message from "../components/Message.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: 'home',
    component: Container,
    children: [
      {
        path: "/calendar",
        name: "calendar",
        component: Calendar
      },
      {
        path: "/message",
        name: "message",
        component: Message
      }
    ]

  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
