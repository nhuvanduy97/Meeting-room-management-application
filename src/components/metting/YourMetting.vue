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
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)" icon="el-icon-edit">Edit</el-button>
          <el-button size="mini" type="danger" icon="el-icon-circle-close">Cancel</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog ref="dialog" title="Your Metting" :append-to-body="true" :visible.sync="dialogEdit">
      <el-collapse v-model="activeNames">
         <el-collapse-item title="Edit Metting">
            <el-form label-width="100px">
              <el-form-item label="Title">
                <el-input v-model="title"></el-input>
              </el-form-item>
              <el-form-item label="Note">
                <el-input
                  v-model="note"
                  :rows="4"
                  type="textarea">
                </el-input>
              </el-form-item>
            </el-form>
         </el-collapse-item>
      </el-collapse>

      <el-collapse v-model="activeNames">
         <el-collapse-item  title="Invited Members" name="1">
            <el-row>
              <el-col :span="8">
                <el-select v-model="value" filterable placeholder="Select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="16">
                <div class="list-member">list member
                </div>
              </el-col>
            </el-row>
         </el-collapse-item>
      </el-collapse>
    
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">Cancel</el-button>
        <el-button type="primary" @click="dialogEdit = false">Confirm</el-button>
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
import { getBookingOfUser } from "@/api/booking";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      arrBooking: [],
      inviters: [],
      loading: true,
      dialogEdit: false,
      activeNames: ['1'],
      title: "",
      note: "",

      options: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        value: "",
        collaps: 0
    };
  },
  created() {
    this.getBookingOfUser();
  },
  computed: {
     ...mapGetters(["getUserInfos"])
  },
  // watch: {
  //    collaps: function(val){
  //      if(val === 2){
  //        this.$refs['dialog'].style.height ="600px"
  //      }
  //    }
  // },
  // updated(){
  //   this.collaps = document.getElementsByClassName("el-collapse-item is-active").length
  // },
  methods: {
    getBookingOfUser() {
      return getBookingOfUser(this.getUserInfos._id).then(res => {
        if (res.data){
          this.arrBooking = [...res.data.booking]
          this.loading = false;
        }
      })
    },

    handleEdit(row) {
      this.dialogEdit = true;
      this.note = row.note
      this.title = row.title
      console.log(row)
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
.list-member {
    background: red;
    width: 100%;
    height: auto;
  }
</style>