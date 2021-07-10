<template>
<div class="container-player">
  <div class="player-preview">
    <div :title="name" @click="moveToPlayerPage(id)" class="player-title">
      <b>Player Name:</b> {{ name }}
    </div>
    <div class="player-content">
    <ul>
      <li> <b>Team Name:</b> {{ team_name }}</li>
      <li> <b>Position:</b> {{ position }}</li>
    </ul>
    </div>
    <div class="player-image" style="text-align: center">
    <img @click="moveToPlayerPage(id)"
      :src="image"
      class="card-img-bottom"
      style="max-height: 200px; width: auto"
    />
    <b-button v-if="$root.store.username" class="b-button" :disabled="this.$root.store.favoritePlayers.some(data=> data.id==id)" @click=addToFavorite> &#128077; </b-button>
    </div>
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
        type: String,
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
    },
    async addToFavorite(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          "http://localhost:3000/users/favoritePlayers",
          {
            playerId: this.id.toString()
          }
        );
        this.axios.defaults.withCredentials = false;
        this.$root.store.favoritePlayers.push({id: this.id, name: this.name , team_name: this.team_name, position:this.position, image:this.image });
        console.log(response);
      } catch (error) {
        console.log("error in add to favorite Players")
        console.log(error);
        this.$root.toast("Favorite Players", error.data, "warning");
      }
    }
  },
  mounted(){
    console.log("player preview mounted")
  } 
};
</script>

<style>
.container-player{
  display: inline-block;
}
.player-preview {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 250px;
  height: 320px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 2px;
  border-color:cadetblue;
  background:rgba(255, 255, 255, 0.75);
  color:black;
  align-items: center;

}

.player-preview .player-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(8,54,116);
}

.player-preview .player-content {
  width: 100%;
  overflow: hidden;
}
.button{
  align-items: center;
  text-align: center;
}
.player-title,.player-content,.player-image,.button{
  flex-grow: 1;
}
</style>
