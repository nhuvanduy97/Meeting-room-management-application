<template>
  <div class="my-booking-room fadeInRight animated">
    <div class="header container">
      <h3>Reserve a Metting Room</h3>
      <span>Please complete the form below to reserve a room</span>
      <el-divider></el-divider>
    </div>
    <div class="body-reserve-booking">
      <el-row>
        <el-col :span="17">
          <el-form ref="form" label-width="200px">
            <el-form-item label="Title">
              <span class="required">*</span>
              <el-input v-model="title"></el-input>
            </el-form-item>
            <el-form-item label="Room">
              <span class="required">*</span>
              <el-select v-model="room" placeholder="Please select room">
                <div v-for="(room, index) in rooms" :key="index">
                  <el-option :value="room.name"></el-option>
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
                class="media-time"
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
                v-model="inviter"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="Choose member is inviter"
              >
                <el-option
                  v-for="member in membersOfTeam"
                  :key="member.id"
                  :label="member.name"
                  :value="member.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Note">
              <el-input type="textarea" v-model="note"></el-input>
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
      rooms: [],
      room: "",
      date: new Date(),
      title: "",
      note: "",

      membersOfTeam: [],
      inviter: []
    };
  },
  created() {
    this.getInfoRoom();
    this.getUserByTeamId();
  },
  computed: {
    ...mapGetters(["getUserInfos"])
  },
  methods: {
    getUserByTeamId() {
      getUserByTeamId(this.getUserInfos.teamId._id).then(res => {
        for (let i = 0; i < res.data.members.length; i++) {
          if (res.data.members[i]._id !== this.getUserInfos._id) {
            let member = {
              id: res.data.members[i]._id,
              name: res.data.members[i].name
            };
            this.membersOfTeam.push(member);
          }
        }
      });
    },
    getInfoRoom() {
      return getAllRoom().then(res => {
        this.rooms = [...res.data.rooms];
      });
    },
    onSubmit() {
      
      console.log("title", this.title,"room", this.room, "date", this.date, "inviter", this.inviter, "startTime",this.startTime, "endTime", this.endTime,"note", this.note);
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

  @media screen and (min-width: 1000px) {
    .media-time {
      margin-left: 20px;
    }
  }
}
</style>