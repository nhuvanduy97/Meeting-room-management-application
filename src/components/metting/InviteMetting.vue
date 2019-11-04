<template>
  <div class="my-metting">
    <div>
        <h1>My Metting</h1>
    </div>
     <el-divider></el-divider>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="hover">
          <div style="margin-top:20px;">
            <div class="title-metting">
              <i class="icon el-icon-s-cooperation"></i>
              <span>Metting Name</span>
            </div>
            <div class="time-metting">
              <i class="icon el-icon-time"></i>
              <span>10:30 - 11:30</span>
              <span style="margin-left:5px">12 person</span>
            </div>
            <el-divider></el-divider>
            <div class="date-metting">
              <i class="icon el-icon-date"></i>
              <span>/mon, 10.2.2019</span>
              <el-dropdown style="float:right" size="medium" split-button type="primary">
                Options
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div style="margin-top:20px;">
            <div class="title-metting">
              <i class="icon el-icon-s-cooperation"></i>
              <span>Metting Name</span>
            </div>
            <div class="time-metting">
              <i class="icon el-icon-time"></i>
              <span>10:30 - 11:30</span>
              <span style="margin-left:5px">12 person</span>
            </div>
            <el-divider></el-divider>
            <div class="date-metting">
              <i class="icon el-icon-date"></i>
              <span>/mon, 10.2.2019</span>
              <el-dropdown style="float:right" size="medium" split-button type="primary">
                Options
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      metting: [
        {
          id: 1,
          title: "Metting...",
          startTime: "8:30",
          endTime: "10:00",
          date: new Date(),
          room: "AWS",
          invited: "Nhu Van Duy"
        },
        {
          id: 2,
          title: "Metting...",
          startTime: "10:30",
          endTime: "12:00",
          date: new Date(),
          room: "ANDROID",
          invited: "Nguyen Van An"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.my-metting {
  margin-top: 20px;
  .time-metting {
    margin-top: 5px;
  }
  .icon {
    margin-right: 5px;
  }
  .date-metting {
    margin-bottom: 5px;
  }
  .el-card {
    border-top: 8px solid #66b1ff !important;
    border-top-left-radius: 6px !important;
    border-top-right-radius: 6px !important;
  }
  .el-divider--horizontal {
    margin: 25px 0;
  }
}
</style>