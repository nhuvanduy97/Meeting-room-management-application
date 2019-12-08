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
          <el-form :model="booking" :rules="rules" ref="ruleForm" label-width="200px">
            <el-form-item label="Title" prop="title">
              <el-input v-model="booking.title"></el-input>
            </el-form-item>
            <el-form-item label="Room" prop="room">
              <el-select @change="onChangeRoom(booking.room)" v-model="booking.room" placeholder="Please select room">
                <div v-for="(room, index) in rooms" :key="index">
                  <el-option :label="room.name" :value="room._id"></el-option>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="Date" prop="date">
              <div class="block">
                <el-date-picker
                :picker-options="datePickerOptions"
                @change="changeDate(booking.date)"
                  v-model="booking.date"
                  type="date"
                  :default-value="booking.date"
                  placeholder="Pick a date"
                ></el-date-picker>
              </div>
            </el-form-item>

            <el-form-item label="Time">
              <el-time-select
                placeholder="Start time"
                v-model="booking.startTime"
                @change="onChangeStartTime(booking.startTime)"
                :picker-options="{
                start: '08:30',
                step: '00:30',
                end: '18:30'
                }"
              ></el-time-select>
              <el-time-select
                class="media-time"
                placeholder="End time"
                v-model="booking.endTime"
                :picker-options="{
                start: '08:30',
                step: '00:30',
                end: '18:30',
                minTime: booking.startTime
                }"
              ></el-time-select>
            </el-form-item>

            <el-form-item label="Inviter">
              <el-select
                v-model="booking.inviter"
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
              <el-input type="textarea" v-model="booking.note"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleClickCreate('ruleForm')">Create</el-button>
              <el-button>Cancel</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col style="margin-left:40px" :span="4">
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getAllRoom } from "@/api/room-api.js";
import { getUserByTeamId } from "@/api/user.js";
import { reserveRoom, findBooking } from "@/api/booking.js";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      booking: {
        startTime: "",
        date: new Date(),
        endTime: "",
        room: "",
        title: "",
        note: "",
        inviter: [],
        time: ""
      },
      rules: {
        title: [
          { required: true, message: "Please input Title", trigger: "blur" }
        ],
        room: [
          { required: true, message: "Please select Room", trigger: "change" }
        ],
        startTime: [
          { required: true, message: "Please select Room", trigger: "change" }
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "Please pick a date",
            trigger: "change"
          }
        ]
      },
      membersOfTeam: [],
      rooms: [],
      datePickerOptions: {
        disabledDate (date) {
          return  moment(date).isBefore(new Date())
        }
      },
      roomSelected: "",
      checkBooking: [],
      step: 0
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
    onChangeRoom(roomId){
      this.roomSelected = roomId
    },
    changeDate(date){
      this.checkBooking = []
      let data = moment(date).format("YYYY-MM-DD")
      findBooking(this.roomSelected, data).then(res => {
        this.checkBooking = [...res.data.result]
      })
    },
    onChangeStartTime(startTime){
      for(let i=0;i<this.checkBooking.length;i++){
        if(startTime < this.checkBooking[i].endTime || startTime <= this.checkBooking[i].startTime){
          this.booking.startTime = ""
          this.$message.error('Erro!, This time has been dupplicated!');
        }
      }
    },
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
    handleClickCreate(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          let data = {
            title: this.booking.title,
            room: this.booking.room,
            date: moment(this.booking.date).format("YYYY-MM-DD"),
            startTime: this.booking.startTime,
            endTime: this.booking.endTime,
            note: this.booking.note,
            inviters: this.booking.inviter,
            members: []
          };
          reserveRoom(data).then(res => {
            if (res.data.success) {
              this.$notify({
                title: "Success",
                message: "Room reservation successful!",
                type: "success"
              });
              this.booking.startTime = "";
              this.booking.date = new Date();
              this.booking.endTime = "";
              this.booking.title = "";
              this.booking.note = "";
              this.booking.inviter = [];
              this.booking.time = ""
            }
            else {
              this.$notify.error({
              title: 'Error',
              message: 'Room reservation erro!'
              });
              this.$refs[ruleForm].resetFields();
            }
          });
        } else {
          alert("Erro!");
          return false;
        }
      });
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