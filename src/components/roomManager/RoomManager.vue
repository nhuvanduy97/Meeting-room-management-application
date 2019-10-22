<template>
  <div class="my-container fadeInRight animated">
    <div>
      <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-edit">Add</el-button>
    </div>
    <div class="table-room">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="Name" prop="name"></el-table-column>
        <el-table-column label="Position" prop="position"></el-table-column>
        <el-table-column label="Capacity" prop="capacity"></el-table-column>
        <el-table-column label="Description" prop="description"></el-table-column>
        <el-table-column label="Status" prop="status"></el-table-column>
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

    <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="Promotion name" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Zones" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="Please select a zone">
        <el-option label="Zone No.1" value="shanghai"></el-option>
        <el-option label="Zone No.2" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "R102",
          name: "IOT",
          position: "Floor 8 A2",
          capacity: 120,
          description: "This is room conference",
          status: "Active"
        },
        {
          id: "R103",
          name: "ANDROID",
          position: "Floor 6 A1",
          capacity: 120,
          description: "This is room conference",
          status: "Empty"
        },
        {
          id: "R106",
          name: "AWS",
          position: "Floor 9 A5",
          capacity: 120,
          description: "This is room conference",
          status: "Active"
        }
      ],
      search: "",
      dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style lang="scss">
.my-container {
  padding-top: 20px;
  .table-room {
    margin-top: 20px;
  }
}
.animated {
    animation-duration: 0.2s;
}
</style>