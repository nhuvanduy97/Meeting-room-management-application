<template>
  <div class="my-component fadeInRight animated"  v-loading="loading">
    <el-table :data="arrBooking" style="width: 100%;padding-left:10px">
      <el-table-column label="Title" prop="title"></el-table-column>
      <el-table-column label="Room" prop="room.name"></el-table-column>
      <el-table-column label="Start Time" prop="startTime"></el-table-column>
      <el-table-column label="End Time" prop="endTime"></el-table-column>
      <el-table-column label="Date" prop="date"></el-table-column>
      <!-- <el-table-column width="120" label="Permission">
        <template slot-scope="scope">
         <div v-for="(inviter, i) in scope.row.inviters" :key="i">
            <span v-html="inviter.name"></span>
         </div>
        </template>
      </el-table-column>
      <el-table-column label="Note" prop="note"></el-table-column> -->
      <el-table-column width="300" label="Actions">
        <template slot-scope="scope">
           <el-button size="small" type="primary" icon="el-icon-search" @click="onClickDetail(scope.row)">Detail</el-button>
          <el-button v-if="scope.row.status !== 1" size="small" icon="el-icon-remove" @click="handleAccept(scope.$index,scope.row)">Accept</el-button>
          <el-button v-else size="small" type="success" icon="el-icon-check">Accept</el-button>
          <el-button :disabled="checkAccept(scope.row)" size="small" type="danger" icon="el-icon-circle-close" @click="handleRequest(scope.row)">Request</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="Booking Details"
      :visible.sync="isViewDetailBooking"
      width="40%"
      :append-to-body="true">
      <el-row>
        <el-col :span="16">
          <div class="booking-details">
            <label style="font-weight:bold;font-size:20px;color:#007bff">Booking</label>
            <div class="title-booking">
              <div style="display:flex">
                <div style="width:100px; height:30px">
                  <label class="title">Title</label>
                </div>
                <span>{{bookingDetails.title}}</span>
              </div>
              <div style="display:flex">
                <div style="width:100px; height:30px">
                  <label class="title">Room</label>
                </div>
                <span>{{nameRoom}}</span>
              </div>
              <div style="display:flex">
                <div style="width:100px; height:100%">
                  <label class="title">Note</label>
                </div>
                <span>{{bookingDetails.note}}</span>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="date-time-booking">
            <label style="font-weight:bold;font-size:20px;color:#007bff">Time</label>
            <div style="display:flex">
              <div style="width:100px">
                <label class="title">Start-Time</label>
              </div>
              <span>{{bookingDetails.startTime}}</span>
            </div>
            <div style="display:flex">
              <div style="width:100px">
                <label class="title">End-Time</label>
              </div>
              <span>{{bookingDetails.endTime}}</span>
            </div>
            <div style="display:flex">
              <div style="width:100px">
                <label class="title">Date</label>
              </div>
              <span>{{bookingDetails.date}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <label style="font-weight:bold;font-size:20px;color:#007bff">Created By</label>
          <div>
            <span>{{createdBy}}</span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>

    <div style="margin-top:50px" class="page">
      <el-pagination
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllBookingRoom, confirmBooking, deleteRoom} from "@/api/booking";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      arrBooking: [],
      inviters: [],
      loading: true,
      isViewDetailBooking: false,
      bookingDetails: {},
      nameRoom: "",
      createdBy: ""
    };
  },
  created() {
    this.getAllBookingRoom();
  },
  computed: {
     ...mapGetters(["getUserInfos"])
  },
  methods: {
    checkAccept(row){
      if (row.status === 1) return true;
      else return false;
    },
    getAllBookingRoom() {
      return getAllBookingRoom().then(res => {
        if (res.data){
          this.arrBooking = [...res.data.booking]
          this.loading = false;
        }
      }).catch(err => {
        return Promise.reject(err)
      })
    },
    handleAccept(index,row){
      this.$confirm('Are you sure to confirm. Continue?', 'Confirm', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          let data = {
            _id: row._id
          }
          confirmBooking(data).then(res => {
            if (res.data.message){
              this.getAllBookingRoom();
              this.$message({
              type: 'success',
              message: 'Accepted'
              });
            }
          })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Canceled'
          });          
        });
      
    },
    onClickDetail(booking){
      this.nameRoom = booking.room.name
      this.createdBy = booking.user.name
      this.bookingDetails = {...booking}
      this.isViewDetailBooking = true
    },
    handleRequest(row){
      deleteRoom(row._id).then(res => {
        console.log(res)
      })
      this.$confirm('Are you sure. Continue?', 'Confirm', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // deleteRoom(_id).then(res => {
          //   console.log("res", res.data)
          // })
          this.$message({
            type: 'success',
            message: 'Request completed'
          });
        })
      console.log(row)
    }
  },
};
</script>

<style lang="scss">
.el-dialog__footer {
  text-align: left !important;
}
.el-form-item__label {
  width: auto !important;
}
.el-form-item__content {
  margin-left: 80px !important;
}
.el-select {
  width: 193px !important;
}
.el-dialog__title {
  font-weight: bold;
  font-size: 25px;
}
.booking-details {
  height: 130px;
}
.title {
  font-weight: bold;

}
</style>