<template>
  <div class="my-container fadeInRight animated">
    <div>
      <el-button
        type="primary"
        size="small"
        @click="dialogFormVisible = true"
        icon="el-icon-edit"
      >Add</el-button>
    </div>
    <div class="table-room" v-loading="loading">
      <el-table :data="rooms" style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="Name" prop="name"></el-table-column>
        <el-table-column label="Position" prop="position"></el-table-column>
        <el-table-column label="Seat Number" prop="seatnumber"></el-table-column>
        <el-table-column label="Description" prop="des"></el-table-column>
        <el-table-column label="Actions" align="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="page">
        <el-pagination
          :page-sizes="[10, 20, 30, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1"
        ></el-pagination>
      </div>
    </div>

    <el-dialog
      :append-to-body="true"
      :close-on-click-modal="false"
      title="Add Room"
      :visible.sync="dialogFormVisible"
    >
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
          <el-button type="primary" @click="handleAddRoom()">Save</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :append-to-body="true"
      :close-on-click-modal="false"
      title="Update Room"
      :visible.sync="dialogUpdateVisible"
    >
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
          <el-button type="primary" @click="updateRoom()">Update</el-button>
          <el-button type="primary" @click="dialogUpdateVisible = false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import axios from "axios";
import { getAllRoom, addRoom, updateRoom, deleteRoom } from "@/api/room-api.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      rooms: [],
      search: "",
      dialogFormVisible: false,
      dialogUpdateVisible: false,
      loading: true,
      formLabelWidth: "120px",
      room: {
        _id: "",
        name: "",
        position: "",
        seatNumber: 0,
        description: ""
      }
      // token: ""
    };
  },
  computed: {
    ...mapGetters(["getUserInfos"])
  },
  created() {
    this.getInfoRoom();
  },
  methods: {
    getInfoRoom() {
      return getAllRoom().then(res => {
        if (res) {
          this.rooms = [...res.data.rooms];
          this.loading = false;
        }
      });
    },
    handleEdit(index, row) {
      this.dialogUpdateVisible = true;
      this.room._id = row._id;
      this.room.name = row.name;
      this.room.seatNumber = row.seatnumber;
      this.room.position = row.position;
      this.room.description = row.des;
    },
    handleDelete(row) {
      this.$confirm("Do you want delete room. Continue?", "Confirm", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel"
      })
        .then(() => {
          deleteRoom(row._id).then(res => {
            if (res.data.message) {
              this.$message({
                type: "success",
                message: "Delete completed"
              });
              this.getInfoRoom();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled"
          });
        });
    },
    handleAddRoom() {
      let data = {
        name: this.room.name,
        seatnumber: this.room.seatNumber,
        position: this.room.position,
        des: this.room.description,
        manager: this.getUserInfos._id
      };
      addRoom(data).then(res => {
        if (res.data.success) {
          this.$notify({
            title: "Success",
            message: "Add room success",
            type: "success"
          });
        } else {
          this.$notify.error({
            title: "Error",
            message: "Add room erro!"
          });
          (this.room.name = ""),
            (this.room.seatNumber = ""),
            (this.room.position = ""),
            (this.room.description = "");
        }
      });
      this.getInfoRoom();
      this.dialogFormVisible = false;
    },
    updateRoom() {
      let data = {
        _id: this.room._id,
        name: this.room.name,
        seatnumber: this.room.seatNumber,
        position: this.room.position,
        des: this.room.description,
        manager: this.getUserInfos._id
      };
      updateRoom(data).then(res => {
        if (res.data.message) {
          this.getInfoRoom();
          this.$notify({
            title: "Success",
            message: "Update room success",
            type: "success"
          });
        } else {
          this.$notify.error({
            title: "Error",
            message: "Update room erro!"
          });
        }
      });
      this.dialogUpdateVisible = false;
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
.cell {
  display: flex !important;
}

.animated {
  animation-duration: 0.2s;
}
</style>