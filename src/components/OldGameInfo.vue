<template>
  <div class="old-game-info">
    <div :title="id" class="old-game-title">
      <b>Game Id:</b> {{ id }}
    </div>
    <ul class="old-game-content">
      <li> <b>Host:</b> {{ hometeam }}</li>
      <li> <b>Guest:</b> {{ awayteam }}</li>
      <li> <b>Date:</b> {{ game_date }}</li>
      <li> <b>Time:</b> {{ game_time }}</li>
      <li> <b>Field:</b> {{ field }}</li>
      <li> <b>Referee:</b> {{ referee }}</li>
      <li> <b>Score</b> {{score}}</li>
    </ul>
    <EventInfo
        v-for="e in logevent"
      :minute="e.minute" 
      :event="e.event"  
      :key="e.event_id">
    ></EventInfo>
  </div>
</template>

<script>
export default {
  name: "OldGameInfo",
  props: {
      id: {
        type: Number,
        required: true
      },
      hometeam: {
        type: String,
        required: true
      },
      awayteam: {
        type: String,
        required: true
      },
      game_date: {
        type: String,
        required: true
      },
      game_time: {
        type: String,
        required: true
      },
      field: {
        type: String,
        required: true
      },
      referee: {
        type: String,
        required: true
      },
    score: {
        type: String,
      },
    logevent: {
        type: Array,
      }
  }, 
  mounted(){
    console.log("old game info mounted")
  } 
};
</script>

<style>
.old-game-info {
  display: inline-block;
  width: 250px;
  height: 400px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 2px;
  border-color:cadetblue;
  background:rgba(255, 255, 255, 0.75);
}

.old-game-info .old-game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(8,54,116);
}

.old-game-info .old-game-content {
  align-content: center;
  text-align: left;
}



</style>
