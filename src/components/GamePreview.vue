<template>
  <div class="game-preview">
    <div :title="id" class="game-title">
      <b>Game Id:</b> {{ id }}
    </div>
    <ul class="game-content">
      <li> <b>Host:</b> {{ hometeam }}</li>
      <li> <b>Guest:</b> {{ awayteam }}</li>
      <li> <b>Date:</b> {{ game_date }}</li>
      <li> <b>Time:</b> {{ game_time }}</li>
      <li> <b>Field:</b> {{ field }}</li>
      <li> <b>Referee:</b> {{ referee }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
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
      }
  }, 
  mounted(){
    console.log("game preview mounted")
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}



</style>
