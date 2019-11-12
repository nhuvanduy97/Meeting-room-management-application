<template>
  <div class="my-component fadeInRight animated">
    <div style="margin-left:20px;margin-top:20px" class="container">
      <h4>Your Metting</h4>
      <span>Please invite additional people after being accepted for the meeting room reservation</span>
      <el-divider></el-divider>
    </div>
    <el-table :data="tableData" style="width: 100%;padding-left:10px">
      <el-table-column label="Title" width="300"></el-table-column>
      <el-table-column label="Room" width="180"></el-table-column>
      <el-table-column label="Time" width="120"></el-table-column>
      <el-table-column label="Date" width="120"></el-table-column>
      <el-table-column label="Inviter" width="180"></el-table-column>
      <el-table-column label="Note" width="300"></el-table-column>
      <el-table-column style="display:flex; justify-content:center" label="Action">
        <el-button size="mini" type="success" icon="el-icon-check">Active</el-button>
        <el-button size="mini" icon="el-icon-remove">Inctive</el-button>
        <el-button size="mini" type="primary" icon="el-icon-edit">Edit</el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete">Delete</el-button>
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
    <!-- <el-dialog
      :close-on-click-modal="false"
      :append-to-body="true"
      title="Invite Members"
      :visible.sync="dialogFormVisible"
    >
      <el-row>
        <el-col span="12">
          <el-form :model="form">
            <el-form-item label="Team" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="Team">
                <el-option label="Zone No.1" value="shanghai"></el-option>
                <el-option label="Zone No.2" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Members" :label-width="formLabelWidth">
              <el-autocomplete
                class="inline-input"
                v-model="state1"
                :fetch-suggestions="querySearch"
                placeholder="Member"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-form>
          <div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
            </span>
          </div>
        </el-col>
        <el-col :span="12">table members</el-col>
      </el-row>
    </el-dialog>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-02",
          name: "John",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-04",
          name: "Morgan",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-01",
          name: "Jessy",
          address: "No. 189, Grove St, Los Angeles"
        }
      ],
      state1: "",
      search: "",
      formLabelWidth: "120px",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      dialogFormVisible: false
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    querySearch(queryString, cb) {
      var links = this.links;
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;
      // call callback function to return suggestions
      cb(results);
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
.cell {
  display: flex;
  justify-content: center;
}
</style>