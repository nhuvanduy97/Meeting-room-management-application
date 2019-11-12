<template>
  <div class="my-calendar fadeInRight animated">
    <div class="filter">
      <v-row>
        <v-col class="d-flex" cols="4">
          <v-select prepend-icon="room" :items="items" label="Room"></v-select>
        </v-col>
        <v-col cols="4">
          <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="date" label="Date" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col style="line-height:4" cols="2">
          <el-button type="primary" icon="el-icon-search">Search</el-button>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col>
        <v-sheet height="400">
          <v-calendar
            ref="calendar"
            :now="today"
            :value="today"
            :events="events"
            color="primary"
            type="week"
          >
            <!-- the events at the top (all-day) -->
            <template v-slot:day-header="{ date }">
              <template v-for="event in eventsMap[date]">
                <!-- all day events don't have time -->
                <div
                  v-if="!event.time"
                  :key="event.title"
                  class="my-event"
                  @click="open(event)"
                  v-html="event.title"
                ></div>
              </template>
            </template>
            <!-- the events at the bottom (timed) -->
            <template v-slot:day-body="{ date, timeToY, minutesToPixels }">
              <template v-for="event in eventsMap[date]">
                <!-- timed events -->
                <div
                  v-if="event.time"
                  :key="event.title"
                  :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                  class="my-event with-time"
                  @click="open(event)"
                  v-html="event.title"
                ></div>
              </template>
            </template>
          </v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    modal: false,

    today: "2019-01-08",
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    events: [
      {
        name: "Weekly Meeting",
        start: "2019-01-07 09:00",
        end: "2019-01-07 10:00"
      },
      {
        name: "Thomas' Birthday",
        start: "2019-01-10"
      },
      {
        name: "Mash Potatoes",
        start: "2019-01-09 12:30",
        end: "2019-01-09 15:30"
      }
    ]
  }),
  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
  }
};
</script>

<style lang="scss">
.animated {
  animation-duration: 0.2s;
}
.my-calendar {
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;
  }

  .my-event.with-time {
    position: absolute;
    right: 4px;
    margin-right: 0px;
  }
  .filter {
    margin-top: 10px;
    width: 100%;
  }
  
}
</style>