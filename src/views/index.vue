<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <div class="info-user">
        <el-popover placement="bottom" width="200" trigger="click">
          <div>
            <div style="cursor:pointer" class="change-password hover">
              <i class="el-icon-user-solid"></i>
              <span style="margin-left:5px">Change Password</span>
            </div>
            <div style="margin-top:10px;cursor:pointer" class="change-info hover">
              <i class="el-icon-s-tools"></i>
              <span style="margin-left:5px">Change Infomation</span>
            </div>
            <el-divider></el-divider>
            <div @click="LogOut()" style="cursor:pointer" class="log-out hover">
              <i class="el-icon-caret-right"></i>
              <span style="margin-left:5px">Logout</span>
            </div>
          </div>
          <v-avatar slot="reference">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </el-popover>

        <div class="user">
          <span>{{user.name}}</span>
          <span>{{user.department}}</span>
        </div>
      </div>
      <template>
        <v-divider></v-divider>
      </template>
      <v-list dense shaped>
        <template v-for="common in commons">
        <div :key="common.text">
          <router-link :to="common.href">
            <v-list-item>
              <v-list-item-action>
                <v-icon>{{ common.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ common.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </div>
      </template>
      </v-list>
      <v-list dense shaped>
        <template v-for="item in items">
          <div v-show="item.isPermission" :key="item.text">
            <router-link :to="item.href">
              <v-list-item>
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </div>
        </template>
        <template>
          <v-divider></v-divider>
        </template>
        <template v-for="st in setting">
          <div :key="st.text">
            <router-link :to="st.href">
              <v-list-item>
                <v-list-item-action>
                  <v-icon>{{ st.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ st.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </div>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Room Reservation</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>groups</v-icon>
      </v-btn>
      <!-- <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify"></v-img>
        </v-avatar>
      </v-btn>-->
    </v-app-bar>

    <v-content>
      <div class="content">
        <router-view></router-view>
      </div>
    </v-content>

    <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent width="800px">
      <v-card>
        <v-card-title class="grey darken-2">Book Room</v-card-title>
        <v-container>
          <v-row>
            <v-col class="align-center justify-space-between" cols="12">
              <v-row align="center">
                <v-text-field prepend-icon="title" placeholder="Title"></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field prepend-icon="access_time" placeholder="Start"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field placeholder="End"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="date" label="Date" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="description" placeholder="Description"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select prepend-icon="room" :items="rooms" label="Room" solo></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="notes" placeholder="Notes"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn text color="primary" @click="triggerClickSave()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    source: String
  },
  computed: {
    ...mapGetters(["getUserInfos"])
  },
  created() {
    this.user = this.$cookies.get("user");
    for (let i = 0; i < this.items.length; i++) {
      if (this.user.roleId.name === "admin") {
        this.items[i].isPermission = true;
      }
      if (this.user.roleId.name === "leader") {
        if (this.items[i].permission === "leader") {
          this.items[i].isPermission = true;
        }
      }
      if (this.user.roleId.name === "managerroom") {
        if (this.items[i].permission === "managerroom") {
          this.items[i].isPermission = true;
        }
      }
      if (this.user.roleId.name === "member") {
        this.items[i].isPermission = false;
      }
    }
  },
  data: () => ({
    user: {},
    date: new Date().toISOString().substr(0, 10),
    modal: false,
    dialog: false,
    drawer: null,
    rooms: ["Foo", "Bar", "Fizz", "Buzz"],
    items: [
      {
        icon: "calendar_today",
        text: "Calendar",
        href: "/calendar",
        permission: "leader",
        isPermission: false
      },
      {
        icon: "work",
        text: "Your Metting",
        href: "/your-metting",
        permission: "leader",
        isPermission: false
      },
      {
        icon: "view_array",
        text: "Report",
        href: "/report",
        permission: "leader",
        isPermission: false
      },
      {
        icon: "meeting_room",
        text: "Room Manager",
        href: "/room-manager",
        permission: "managerroom",
        isPermission: false
      },
        {
        icon: "assignment_turned_in",
        text: "Booking Room",
        href: "/booking-room",
        permission: "leader",
        isPermission: false
      },
      {
        icon: "confirmation_number",
        text: "Booking Confirmation",
        href: "/booking-confirm",
        permission: "managerroom",
        isPermission: false
      }
    ],
    commons: [
      { icon: "home", text: "Home", href: "/home" },
      { icon: "message", text: "Message", href: "/message" },
      { icon: "account_box", text: "Invite Metting", href: "/invite-metting" }
    ],
    setting: [{ icon: "settings_applications", text: "Setting", href: "/home" }]
  }),
  methods: {
    triggerClickSave() {
      this.dialog = false;
    },
    LogOut() {
      this.$cookies.remove("user");
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style lang="scss">
.content {
  padding-left: 10px;
}
.v-list-item:hover {
  background-color: #f6f6f6;
}
.v-list-item__content:hover {
  background-color: #f6f6f6;
}
a:hover {
  text-decoration: none !important;
}
.info-user {
  display: flex;
  margin-left: 20px;
  margin-top: 10px;
  // justify-content: center;
  // text-align: center;
}
.user {
  display: grid;
  margin-left: 10px;
  margin-top: 5px;
}
.hover:hover {
  background: #e9ebee;
}
</style>