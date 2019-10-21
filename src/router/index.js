import Vue from "vue";
import VueRouter from "vue-router";
import Content from "../views/Content.vue";
import Calendar from "../components/Calendar.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "content",
    component: Content,
    children: [
      {
        path: "/calendar",
        name: "calendar",
        component: Calendar
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
