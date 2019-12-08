import Vue from "vue";
import VueRouter from "vue-router";
// import Content from "../views/Content.vue";
import Calendar1 from "../components/calendar/Calendar1.vue"
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

// import Cookies from "vue-cookies"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Container,
    children: [
      {
        path: "/calendar",
        name: "calendar",
        component: Calendar1
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


// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)){
//     console.log("token", Cookies.get("token"))
//     if(Cookies.get("token") === null){
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router;
