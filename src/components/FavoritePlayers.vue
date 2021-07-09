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
      players: this.$root.store.favoritePlayers
    };
  },
  mounted(){
    console.log("favorite games mounted");
    //this.updatePlayers(); 
  }
};
</script>

<style></style>
