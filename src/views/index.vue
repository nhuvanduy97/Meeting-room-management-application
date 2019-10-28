<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <div class="info-user">
        <v-avatar>
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
        <div class="user">
          <span>Nhu Van Duy</span>
          <span>D2</span>
        </div>
      </div>
      <v-list dense shaped>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <div v-for="(child, i) in item.children" :key="i">
              <router-link :to="child.href">
                <v-list-item>
                  <v-list-item-action v-if="child.icon">
                    <v-icon>{{ child.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ child.text }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </router-link>
            </div>
          </v-list-group>
          <div v-else :key="item.text">
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
        <v-icon>group</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
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
          <v-btn text color="primary" @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null,
    // items: [
    //   { icon: "home", text: "Home", href: "/home" },
    //   { icon: "calendar_today", text: "Calendar", href: "/calendar" },
    //   { icon: "message", text: "Message", href: "/message" },
    //   { icon: "work", text: "Metting", href: "/home" },
    //   { icon: "view_array", text: "Report", href: "/report" },

    //   { icon: "help", text: "Help", href: "/home" },
    //   { icon: "meeting_room", text: "Room Manager", href: "/room-manager" },
    //   { icon: "settings_applications", text: "Setting", href: "/home" }
    // ]
    rooms: ["Foo", "Bar", "Fizz", "Buzz"],
    items: [
      { icon: "home", text: "Home", href: "/home" },
      { icon: "calendar_today", text: "Calendar", href: "/calendar" },
      { icon: "message", text: "Message", href: "/message" },
      { icon: "view_array", text: "Report", href: "/report" },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Metting",
        model: false,
        children: [
          { icon: "work", text: "Your Metting", href: "/your-metting" },
          { icon: "credit_card", text: "My Metting", href: "/home" }
        ]
      },
      { icon: "meeting_room", text: "Room Manager", href: "/room-manager" },
      { icon: "settings_applications", text: "Setting", href: "/home" }
    ]
  })
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
</style>