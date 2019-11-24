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
        <v-subheader>MENU</v-subheader>
        <v-list-item-group v-model="item" color="primary">
          <template v-for="(item, i) in commons">
            <router-link :to="item.href" :key="i">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </template>
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
          <v-subheader>SETTING</v-subheader>
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
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">ROOM RESERVATION</span>
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

      <el-popover
        placement="bottom"
        trigger="click"
        popper-class="customize-popper-noti"
      >
        <div v-for="(noti, i) in notifications" :key="i">
          <div class="notification" >
            <div class="message"> 
              <span v-html="noti.message"></span>
            </div>
          </div>
        </div>
        <v-btn style="margin-right:10px" :class="[unReadNoti !==0 ? 'badge' : '']" :data-badge="unReadNoti" slot="reference" large icon>
          <v-icon>notifications</v-icon>
        </v-btn>
      </el-popover>
      <v-btn disabled icon large>
        <v-avatar size="32px" item>
          <v-img src="@/assets/d.png"></v-img>
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <v-content>
      <div class="content">
        <router-view></router-view>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { getNotificationByIdUser } from "@/api/notifications.js"
export default {
  props: {
    source: String
  },
  computed: {
    ...mapGetters(["getUserInfos"])
  },
  created() {
    // console.log("user", this.getUserInfos)

    this.user = this.getUserInfos;
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

    this.getNotification();
  },
  data: () => ({
    item: 1,
    user: {},
    date: new Date().toISOString().substr(0, 10),
    notifications: [],
    unReadNoti: 0,
    drawer: null,
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
    LogOut() {
      this.$cookies.remove("user");
      this.$router.push({ path: "/login" });
    },
    getNotification(){
      return getNotificationByIdUser(this.user._id).then((res) => {
        this.notifications = [...res.data.notification]
        for (let i=0;i<this.notifications.length;i++){
          if (this.notifications[i].status === 0){
            this.unReadNoti ++;
          }
        }
        console.log(this.notifications)
      }).catch((err) => {
        throw err;
      });
    }
  }
};
</script>
<style lang="scss">
.customize-popper-noti {
  padding: 0 !important;
  border: none !important;
  width: 300px !important;
  background-color: #dde9ee !important;
  overflow-x: auto;
  box-shadow: none !important;
  height: 200px !important;
  .message {
    margin-left: 5px;
    margin-right: 5px;
    background: #dde9ee;
    cursor: pointer;
    border-bottom: 0.5px gray solid;
  }
  .message:hover {
    cursor: pointer;
    background-color: #48bcbc;
  }

}
.badge {
   position:relative;
}
.badge[data-badge]:after {
    content: attr(data-badge);
    position: absolute;
    top: -3px;
    right: 3px;
    font-size: 0.7em;
    background: red;
    color: white;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 24px;
    border-radius: 50%;
   box-shadow:0 0 1px #333;
}
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