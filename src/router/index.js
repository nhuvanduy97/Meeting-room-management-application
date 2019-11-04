import Vue from "vue";
import VueRouter from "vue-router";
// import Content from "../views/Content.vue";
import Calendar from "../components/Calendar.vue"
import Container from "../views/index.vue"
import Login from "../components/Login.vue"
import Message from "../components/Message.vue"
import Home from "../components/Home.vue"
import RoomManager from "../components/roomManager/RoomManager.vue"
import Report from "../components/director/Report.vue"
import YourMetting from "../components/metting/YourMetting"
import InviteMetting from "../components/metting/InviteMetting"

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
      },
      {
        path: "/home",
        name: "home",
        component: Home
      },
      {
        path: "/room-manager",
        name: "room-manager",
        component: RoomManager
      },
      {
        path: "/report",
        name: "report",
        component: Report
      },
      {
        path: "/your-metting",
        name: "yourmetting",
        component: YourMetting
      },
      {
        path: "/invite-metting",
        name: "invitemetting",
        component: InviteMetting
      }
    ]

  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresAuth: true }
  }
];
// console.log("cookies", this.$cookies.get("token"))
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
