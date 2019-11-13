<template>
  <div class="my-container fadeInRight animated">
    <div>
      <el-button type="primary" size="small" @click="dialogFormVisible = true" icon="el-icon-edit">Add</el-button>
    </div>
    <div class="table-room">
      <el-table
        :data="rooms.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="Name" prop="name"></el-table-column>
        <el-table-column label="Position" prop="position"></el-table-column>
        <el-table-column label="Seat Number" prop="seatnumber"></el-table-column>
        <el-table-column label="Description" prop="des"></el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="Type to search" />
          </template>
          <template>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1"
      ></el-pagination>
    </div>

    <el-dialog :append-to-body="true" title="Add Room" :visible.sync="dialogFormVisible">
      <el-form status-icon>
        <el-form-item label="Name">
          <el-input v-model="room.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Position">
          <el-input v-model="room.position" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Seat Number">
          <el-input-number v-model="room.seatNumber" :min="50" :max="500"></el-input-number>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="room.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="toggleClick()">Save</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import axios from "axios";
import { getAllRoom, addRoom } from "@/api/room-api.js";
export default {
  data() {
    return {
      rooms: [],
      search: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      room: {
        name: "",
        position: "",
        seatNumber: 0,
        description: ""
      },
      // token: ""
    };
  },
  created() {
    // this.token = this.$cookies.get("token");
    this.getInfoRoom();
  },
  updated() {
    this.getInfoRoom();
  },
  methods: {
    getInfoRoom() {
      return getAllRoom().then(res => {
        this.rooms = [...res.data.rooms];
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    toggleClick() {
      let data = {
        name: this.room.name,
        seatnumber: this.room.seatNumber,
        position: this.room.position,
        des: this.room.description
      };
      addRoom(data).then(res => {
        console.log(res);
      });
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style lang="scss">
.my-container {
  padding-top: 20px;
  margin-left: 10px;
  .table-room {
    margin-top: 20px;
  }
  .page {
    margin-top: 50px;
  }
  .el-select {
    width: 105px !important;
}
.el-pager {
  padding-left: 5px;
  padding-right: 5px;
}
}
.el-dialog__wrapper {
  .el-form-item__content {
    margin-left: 110px !important;
  }
  .el-dialog__body {
    height: 370px !important;
  }
}

.animated {
  animation-duration: 0.2s;
}
</style>