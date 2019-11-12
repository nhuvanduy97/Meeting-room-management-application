<template>
  <div class="room-manager">
    <div style="margin-bottom:10px">
      <h4>Room Manager</h4>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i style="margin-right:5px" class="el-icon-date"></i>Manager
        </span>
        <RoomManager></RoomManager>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i style="margin-right:5px" class="el-icon-menu"></i>Booking Confirm
        </span>
        <BookingConfirm></BookingConfirm>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RoomManager from "./RoomManager";
import BookingConfirm from "./BookingConfirm.vue";
export default {
  components: {
    RoomManager,
    BookingConfirm
  }
};
</script>

<style lang="scss">
.room-manager {
  margin-top: 20px;
}
</style>