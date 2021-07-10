<template>
  <div>
    <GamePreview
      v-for="g in games"
      :id="g.game_id" 
      :hometeam="g.hometeam" 
      :awayteam="g.awayteam" 
      :game_date="g.game_date" 
      :game_time="g.game_time" 
      :field="g.feild" 
      :referee="g.referee" 
      :key="g.game_id"></GamePreview>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  data() {
    return {
      games: this.$root.store.favoriteGames
    };
  }, 
  mounted(){
    console.log("favorite games mounted");
    console.log(this.games)
    //this.updateGames(); 
  }
};
</script>

<style></style>
