<template>
  <div class="my-metting fadeInRight animated">
    <div style="margin-left:20px;margin-top:20px" class="container">
      <h1>My Metting</h1>
      <el-divider></el-divider>
    </div>
    <div v-for="(metting,i) in mettings" :key="i">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover">
            <div style="margin-top:20px;">
              <div class="title-metting">
                <i class="icon el-icon-s-cooperation"></i>
                <span>{{metting.title}}</span>
              </div>
              <div class="time-metting">
                <i class="icon el-icon-time"></i>
                <span>{{metting.startTime}} - {{metting.endTime}}</span>
                <span style="margin-left:5px; float:right">{{numberOfMetting}} person</span>
              </div>
              <el-divider></el-divider>
              <div class="date-metting">
                <i class="icon el-icon-date"></i>
                <span>{{metting.date}}</span>
                <el-dropdown style="float:right" size="medium" split-button type="primary">
                  Options
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>Refuse</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </el-card>
        </el-col>
    </el-row>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getAllBookingRoom } from "@/api/booking.js";
export default {
  data() {
    return {
      booking: [],
      mettings: [],
      numberOfMetting: 0,

    };
  },
  computed: {
    ...mapGetters(["getUserInfos"])
  },
  async created (){
    await this.getAllBookingRoom()
    await this.getMetting()
  },
  methods: {
    getAllBookingRoom() {
      return getAllBookingRoom().then((result) => {
        this.booking = [...result.data.booking]
      }).catch((err) => {
        console.log(err)
      });
    },
    getMetting(){
      for (let i=0;i<this.booking.length;i++){
        if (this.booking[i].members){
          let arr = this.booking[i].members
          this.numberOfMetting = arr.length
          if (arr.includes(this.getUserInfos._id)){
            this.mettings.push(this.booking[i])
          } else {
            this.mettings = []
          }
        }
      }
    }
  }
};
</script>

<style lang="scss">
.my-metting {
  margin-top: 20px;
  .time-metting {
    margin-top: 5px;
  }
  .icon {
    margin-right: 5px;
  }
  .date-metting {
    margin-bottom: 5px;
  }
  .el-card {
    border-top: 8px solid #66b1ff !important;
    border-top-left-radius: 6px !important;
    border-top-right-radius: 6px !important;
  }
  .el-divider--horizontal {
    margin: 25px 0;
  }
}
</style>