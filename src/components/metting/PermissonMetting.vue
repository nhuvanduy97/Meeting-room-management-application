<template>
  <div class="my-component fadeInRight animated"  v-loading="loading">
    <div style="margin-left:20px;margin-top:20px" class="container">
      <h4>Permisson Metting</h4>
      <span>Please invite additional people after being have permisson invite for the meeting room reservation</span>
      <el-divider></el-divider>
    </div>
    <el-table :data="arrBooking" style="width: 100%;padding-left:10px">
      <el-table-column label="Title" prop="title"></el-table-column>
      <el-table-column label="Room" prop="room.name"></el-table-column>
      <el-table-column label="Start Time" prop="startTime"></el-table-column>
      <el-table-column label="End Time" prop="endTime"></el-table-column>
      <el-table-column label="Date" prop="date"></el-table-column>
      <el-table-column width="200" label="Note" prop="note"></el-table-column>
      <el-table-column width="150" label="Actions">
        <template slot-scope="scope">
         <el-button size="mini" type="primary" icon="el-icon-edit" @click="addMemberInBooking(scope.row)">Add Member</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Invite Member" width="40%" :append-to-body="true"  :close-on-click-modal="false" :visible.sync="dialogInviteMember">
        <el-form>
            <el-form-item label="Member">
            <el-select @change="changeSelectMember(member)" v-model="member"  placeholder="Please select a member">
                <div v-for="(member,i) in membersOfTeam" :key="i">
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
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {getPermissonbyId } from "@/api/permisson.js"
import { getUserByTeamId, getInfoUserById } from "@/api/user.js";
import { findBookingById, invitedMember } from "@/api/booking.js"
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
        dialogInviteMember: false,
        loading: true,
        arrBooking: [],
        membersOfTeam: [],
        member: "",
        arrInvite: [],
        tableData: [],
        idBooking: ""
    };
  },
  async created() {
    await this.getPermissonbyId()
    await this.getUserByTeamId()
  },
  computed: {
     ...mapGetters(["getUserInfos"])
  },
  methods: {
    getPermissonbyId(){
        return getPermissonbyId(this.getUserInfos._id).then((result) => {
            for (let i=0;i<result.data.permisson.length;i++){
                this.arrBooking.push(result.data.permisson[i].idBooking)
            }
            this.loading = false
        }).catch((err) => {
            Promise.reject(err)
        });
    },
    addMemberInBooking(booking){
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
        this.dialogInviteMember = true
    },
     getUserByTeamId() {
      return getUserByTeamId(this.getUserInfos.teamId._id).then(res => {
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
  .invite-member {
    width: 100%;
    height: 80%;
    border: 1px solid #DCDFE6;
  }
</style>