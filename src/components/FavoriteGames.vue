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
    GamePreview: GamePreview
  }, 
  data() {
    return {
      games: []
    };
  },
  methods: {
    async updateGames(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteGames",
        );
        this.axios.defaults.withCredentials = false;
        const games = response.data;
        this.games = [];
        this.games.push(...games);
        console.log(response);
      } catch (error) {
        console.log("error in update games")
        console.log(error.response.data);
        this.$root.toast("Favorite Games", error.response.data, "warning");
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateGames(); 
  }
};
</script>

<style></style>
