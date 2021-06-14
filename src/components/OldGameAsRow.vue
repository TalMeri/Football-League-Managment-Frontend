<template>
    <tr>
      <td>{{ hometeam }}</td>
      <td>{{ awayteam }}</td>
      <td>{{ game_date }}</td>
      <td>{{ game_time }}</td>
      <td>{{ field }}</td>
      <td>{{ referee }}</td>
      <td v-if="score!=undefined">{{score}}</td>
      <td v-if="logevent!=undefined"><EventInfo       
      v-for="e in logevent"
      :minute="e.gamemin" 
      :event="e.event" 
      :key="e.gamemin+e.event"></EventInfo></td>
    </tr>
</template>

<script>
import EventInfo from "../components/EventInfo";
export default {
  components: {
    EventInfo
  },
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
      },
      score: {
        type: String,
      },
      logevent: {
        type: Array,
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
