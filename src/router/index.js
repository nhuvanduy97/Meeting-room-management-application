import Vue from "vue";
import VueRouter from "vue-router";
// import Content from "../views/Content.vue";
import Calendar from "../components/calendar/Calendar.vue"
import Container from "../views/index.vue"
import Login from "../components/Login.vue"
import Message from "../components/message/Message.vue"
import Home from "../components/Home.vue"
// import RoomManager from "../components/roomManager/RoomManager.vue"
// import BookingConfirm from "../components/roomManager/BookingConfirm.vue"
import RoomManager from "../components/roomManager/"
import Report from "../components/director/Report.vue"
import YourMetting from "../components/metting/YourMetting"
import InviteMetting from "../components/metting/InviteMetting"
import BookingRoom from "../components/bookingRoom/BookingRoom"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
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
      // {
      //   path: "/booking-confirm",
      //   name: "booking-confirm",
      //   component: BookingConfirm
      // },
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
      },
      {
        path: "/booking-room",
        name: "bookingroom",
        component: BookingRoom
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
