<template>
  <div class="my-component fadeInRight animated"  v-loading="loading">
    <el-table :data="arrBooking" style="width: 100%;padding-left:10px">
      <el-table-column label="Title" prop="title"></el-table-column>
      <el-table-column label="Room" prop="room.name"></el-table-column>
      <el-table-column label="Start Time" prop="startTime"></el-table-column>
      <el-table-column label="End Time" prop="endTime"></el-table-column>
      <el-table-column label="Date" prop="date"></el-table-column>
      <el-table-column width="120" label="Permission">
        <template slot-scope="scope">
         <div v-for="(inviter, i) in scope.row.inviters" :key="i">
            <span v-html="inviter.name"></span>
         </div>
        </template>
      </el-table-column>
      <el-table-column label="Note" prop="note"></el-table-column>
      <el-table-column width="250" label="Actions">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status !== 1" size="small" icon="el-icon-remove" @click="handleAccept(scope.$index,scope.row)">Accept</el-button>
          <el-button v-else size="small" type="success" icon="el-icon-check">Accept</el-button>
          <el-button :disabled="checkAccept(scope.row)" size="small" type="warning" icon="el-icon-circle-close" @click="handleRequest(scope.row)">Request</el-button>
        </template>
      </el-table-column>
    </el-table>
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
import { getAllBookingRoom, confirmBooking} from "@/api/booking";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      arrBooking: [],
      inviters: [],
      loading: true
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
    handleRequest(row){
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
</style>