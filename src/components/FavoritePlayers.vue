<template>
  <div>
    <PlayerPreview
      v-for="p in players"
      :id="p.id" 
      :name="p.name" 
      :position="p.position" 
      :team_name="p.team_name" 
      :image="p.image" 
      :key="p.player_id"></PlayerPreview>
  </div>
</template>

<script>
import PlayerPreview from "./PlayerPreview.vue";
export default {
  name: "FavoritePlayers",
  components: {
    PlayerPreview: PlayerPreview
  }, 
  data() {
    return {
      players: []
    };
  },
  methods: {
    async updatePlayers(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/users/favoritePlayers",
        );
        this.axios.defaults.withCredentials = false;
        const players = response.data;
        this.players = [];
        this.players.push(...players);
        console.log(response);
      } catch (error) {
        console.log("error in update players")
        console.log(error.response.data);
        this.$root.toast("Favorite Players", error.response.data, "warning");
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updatePlayers(); 
  }
};
</script>

<style></style>
