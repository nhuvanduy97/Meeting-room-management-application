import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from "vue-cookies";
import store from "./store/store.js";
import VueSession from "vue-session"



Vue.use(ElementUI);
Vue.use(BootstrapVue)
Vue.use(VueCookies)
Vue.use(VueSession)

Vue.config.productionTip = false;
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (localStorage.getItem("isLogin")) {
//       next({
//         name: 'login',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next() // make sure to always call next()!
//   }
// })


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
