<template>
  <div class="my-component fadeInRight animated"  v-loading="loading">
    <div style="margin-left:20px;margin-top:20px" class="container">
      <h4>Your Metting</h4>
      <span>Please invite additional people after being accepted for the meeting room reservation</span>
      <el-divider></el-divider>
    </div>
    <el-table :data="arrBooking" style="width: 100%;padding-left:10px">
      <el-table-column label="Title" prop="title"></el-table-column>
      <el-table-column label="Room" prop="room.name"></el-table-column>
      <el-table-column label="Start Time" prop="startTime"></el-table-column>
      <el-table-column label="End Time" prop="endTime"></el-table-column>
      <el-table-column label="Date" prop="date"></el-table-column>
      <el-table-column label="Permission">
       <template slot-scope="scope">
         <div v-for="(inviter, i) in scope.row.inviters" :key="i">
            <span v-html="inviter.name"></span>
         </div>
        </template>
      </el-table-column>
      <el-table-column label="Note" prop="note"></el-table-column>
      <el-table-column width="300" label="Actions">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="scope.row.status === 1"
            type="success"
            icon="el-icon-check"
          >Active</el-button>
          <el-button size="mini" v-if="scope.row.status === 0" icon="el-icon-remove">Inctive</el-button>
          <el-button size="mini" :disabled="scope.row.status !== 1" type="primary" @click="handleEdit(scope.row)" icon="el-icon-edit">Edit</el-button>
          <el-button size="mini" type="danger" icon="el-icon-circle-close">Cancel</el-button>
        </template>
      </el-table-column>
    </el-table>
    
     <el-dialog title="Invite Member" width="40%" :append-to-body="true"  :close-on-click-modal="false" :visible.sync="dialogInviteMember">
        <el-form>
            <el-form-item label="Member">
            <el-select @change="changeSelectMember(member)" v-model="member"  placeholder="Please select a member">
                <div v-for="(member,i) in members" :key="i">
                    <el-option :label="member.name" :value="member.id"></el-option>
                </div>
            </el-select>
            </el-form-item>
        </el-form>
        <div >
          <div style="padding:10px; width:100%;height:100%;">
           <el-table
            :data="tableData"
            height="250"
            style="width:100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="teamId.name" width="100" label="Team"></el-table-column>
            <el-table-column prop="name" label="Name"></el-table-column>
            <el-table-column width="50">
              <template scope="scope">
                 <el-button size="mini" type="danger" @click="deleleMember(scope.row)" icon="el-icon-delete" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogInviteMember = false">Cancel</el-button>
            <el-button type="primary" @click="onClickInvite()">Invite</el-button>
        </span>
    </el-dialog>


    <div style="margin-top:50px" class="page">
      <el-pagination
        :page-sizes="[1]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getBookingOfUser, findBookingById , invitedMember} from "@/api/booking";
import { getUserByTeamId, getInfoUserById } from "@/api/user.js"
import { getAllRoom } from "@/api/room-api.js"
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      dialogInviteMember: false,
      arrBooking: [],
      inviters: [],
      loading: true,
      title: "",
      note: "",
      rooms: [],
      room: "",
      members: [],
      member: "",
      idBooking: "",
      arrInvite: [],
       tableData: [],
    };
  },
  created() {
    this.getBookingOfUser()
    this.getAllRoom()
    this.getUserByTeamId()
  },
  computed: {
     ...mapGetters(["getUserInfos"])
  },
  methods: {
    getBookingOfUser() {
      return getBookingOfUser(this.getUserInfos._id).then(res => {
        if (res.data){
          this.arrBooking = [...res.data.booking]
          this.loading = false;
        }
      })
    },
    getUserByTeamId() {
       return getUserByTeamId(this.getUserInfos.teamId._id).then(res => {
         for (let i = 0; i < res.data.members.length; i++) {
          if (res.data.members[i]._id !== this.getUserInfos._id) {
            let member = {
              id: res.data.members[i]._id,
              name: res.data.members[i].name
            };
            this.members.push(member);
          }
        }
      });
    },
    getAllRoom(){
      return getAllRoom().then(res => {
        this.rooms = [...res.data.rooms]
      })
    },
    handleEdit(booking) {
      this.idBooking = booking._id
      findBookingById(booking._id).then(res => {
          this.arrInvite = []
          this.arrInvite = [...res.data.booking.members]
          for (let i=0;i<this.arrInvite.length;i++){
            this.getMemberInMetting(this.arrInvite[i])
          }
        }).catch(err => {
          Promise.reject(err)
        })
      this.dialogInviteMember = true;
    },
     getMemberInMetting(member){
       return getInfoUserById(member).then(res => {
         this.tableData.push(res.data.member)
        })
    },
     changeSelectMember(member){
        if (!this.arrInvite.includes(member)){
          this.arrInvite.push(member)
          this.getMemberInMetting(member)
        } else {
          alert("ok")
        }
    },
    onClickInvite(){
      let data = {
        _id: this.idBooking,
        members: this.arrInvite
      }
      invitedMember(data).then(res => {
        if (res.data.message){
           this.$message({
                type: "success",
                message: "Invited"
              });
            window.location.reload()
        }
      })
      this.dialogInviteMember = false
    },
     deleleMember(data){
      if (this.arrInvite.length){
          this.arrInvite = this.arrInvite.filter(item => {
             this.member = ""
             return item !== data._id
        })
      }
      this.tableData =  this.tableData.filter(item => {
        return item.name !== data.name
      })
    }
  },
};
</script>

<style lang="scss">
.el-dialog__footer {
  text-align: right !important;
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
.btn-group {
  margin-top: 15px;
  margin-left: 10px;
}
.list-member {
    // background: yellow;
    border: 1px solid #DCDFE6;
    width: 100%;
    height: 200px;
    overflow-y: auto;
    .display-mmeber {
      cursor: pointer;
      display: flex;
      justify-content: center;
    }
    .icon {
      margin-top: 17px;
      margin-right: 5px;
    }
    .item-member {
      background: #DCDFE6;
      margin-top: 10px;
      width: 100px;
      height: 30px;
      border-radius: 5px;
     
    }
    .check-box {
      margin-top: 10px !important;
      margin-left: 5px !important;
    }
  }
</style>