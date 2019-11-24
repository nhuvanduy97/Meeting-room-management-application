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
      <el-table-column label="Inviter">
        <template v-for="inviter in inviters">
          {{inviter.name}}
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
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">Edit</el-button>
          <el-button size="mini" type="danger" icon="el-icon-circle-close">Cancel</el-button>
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
import { getBookingOfUser } from "@/api/booking";
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
    this.getBookingOfUser();
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

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    createFilter(queryString) {
      return link => {
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    loadAll() {
      return [
        { value: "vue", link: "https://github.com/vuejs/vue" },
        { value: "element", link: "https://github.com/ElemeFE/element" },
        { value: "cooking", link: "https://github.com/ElemeFE/cooking" }
      ];
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.links = this.loadAll();
  }
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