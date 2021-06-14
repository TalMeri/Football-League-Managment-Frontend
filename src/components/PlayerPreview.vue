<template>
  <div class="player-preview">
    <div :title="name" @click="moveToPlayerPage(id)" class="player-title">
      <b>Player Name:</b> {{ name }}
    </div>
    <ul class="player-content">
      <li> <b>Team Name:</b> {{ team_name }}</li>
      <li> <b>Position:</b> {{ position }}</li>
    </ul>
    <div style="text-align: center">
    <img
      :src="image"
      class="card-img-bottom"
      style="height: 200px; width: auto"
    />
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerPreview",
  props: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      team_name: {
        type: String,
        required: true
      },
      position: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      }
  }, 
  methods: {
    async moveToPlayerPage(id){
      this.$router.push(`/PlayerPage/:${id}`);
    }
  },
  mounted(){
    console.log("player preview mounted")
  } 
};
</script>

<style>
.player-preview {
  display: inline-block;
  width: 250px;
  height: 320px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.player-preview .player-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.player-preview .player-content {
  width: 100%;
  overflow: hidden;
}



</style>
