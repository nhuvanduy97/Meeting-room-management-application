<template>
  <div class="my-booking-room fadeInRight animated">
    <div class="header container">
      <h3>Reserve a Metting Room</h3>
      <span>Please complete the form below to reserve a room</span>
      <el-divider></el-divider>
    </div>
    <div class="body-reserve-booking">
      <el-row>
        <el-col :span="17" >
          <el-form ref="form" :model="form" label-width="200px">
            <el-form-item label="Title">
              <span class="required">*</span>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Room">
              <span class="required">*</span>
              <el-select v-model="room" placeholder="Please select room">
                <div v-for="(room, index) in rooms" :key="index">
                  <el-option :label="room.name" :value="room.name"></el-option>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="Date">
              <span class="required">*</span>
              <div class="block">
                <el-date-picker
                  v-model="date"
                  type="date"
                  :default-value="date"
                  placeholder="Pick a date"
                ></el-date-picker>
              </div>
            </el-form-item>

            <el-form-item label="Time">
              <span class="required">*</span>
              <el-time-select
                placeholder="Start time"
                v-model="startTime"
                :picker-options="{
                start: '08:30',
                step: '00:30',
                end: '18:30'
                }"
              ></el-time-select>
              <el-time-select
                style="margin-left:20px"
                placeholder="End time"
                v-model="endTime"
                :picker-options="{
                start: '08:30',
                step: '00:30',
                end: '18:30',
                minTime: startTime
                }"
              ></el-time-select>
            </el-form-item>

            <el-form-item label="Inviter">
              <el-select
                v-model="value"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="Please enter inviter"
                :remote-method="remoteMethod"
                :loading="loading"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-popover
                placement="bottom"
                width="200"
                trigger="click"
                content="This is list member of team"
              >
                <el-button slot="reference" style="margin-left:20px" size="small" type="primary" icon="el-icon-user">Member</el-button>
              </el-popover>
            </el-form-item>

            <el-form-item label="Note">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Create</el-button>
              <el-button>Cancel</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col style="margin-left:40px" :span="4">
          <div style="height: 300px;">
            <el-steps direction="vertical" :active="3">
              <el-step title="Step 1"></el-step>
              <el-step title="Step 2"></el-step>
              <el-step title="Step 3"></el-step>
              <el-step title="Step 4"></el-step>
              <el-step title="Done"></el-step>
            </el-steps>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getAllRoom } from "@/api/room-api.js";
import { getUserByTeamId } from "@/api/user.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      value1: "",
      rooms: [],
      room: "",
      date: new Date(),
      form: {
        name: "",
        region: "",
        desc: ""
      },
      // ispermistion invited memember
      options: [],
      value: [],
      list: [],
      loading: false,
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii"
      ]
    };
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  created() {
    this.getInfoRoom();
    this.getUserByTeamId()
  },
  computed: {
    ...mapGetters(["getUserInfos"])
  },
  methods: {
    getUserByTeamId(){
        console.log(this.getUserInfos.teamId._id)
        let data = {
            teamId: this.getUserInfos.teamId._id
        }
        // console.log("user", this.getUserInfos.teamId._id)
        console.log("data", data)
        getUserByTeamId(data).then(res => {
            console.log(res)
        })
    },
    getInfoRoom() {
      return getAllRoom().then(res => {
        this.rooms = [...res.data.rooms];
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    }
  }
};
</script>

<style lang="scss">
.my-booking-room {
  .header {
    margin: 20px;
  }
  .body-reserve-booking {
    margin-left: 110px;
  }
  .el-form-item__content {
    margin-left: 150px !important;
    // width: 50%;
  }
  .el-select {
    width: 220px !important;
  }
  .el-textarea__inner {
    height: 90px;
  }
  .required {
    position: absolute;
    z-index: 9999;
    left: -100px;
    top: -2px;
    color: red;
  }
}
</style>