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
          <el-form ref="form" :model="form" label-width="200px">
            <el-form-item label="Title">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Room">
              <el-select v-model="room" placeholder="Please select room">
                <div v-for="(room, index) in rooms" :key="index">
                  <el-option :label="room.name" :value="room.name"></el-option>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="Date">
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

            <el-form-item label="Note">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Create</el-button>
              <el-button>Cancel</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
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
      }
    };
  },
  created() {
    this.getInfoRoom();
  },
  methods: {
    getInfoRoom() {
      return getAllRoom().then(res => {
        this.rooms = [...res.data.rooms];
      });
    },
    onSubmit() {
      console.log("submit!");
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
    width: 50%;
  }
  .el-select {
    width: 220px !important;
  }
  .el-textarea__inner {
    height: 90px;
  }
}
</style>