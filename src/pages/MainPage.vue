<template>
  <div class="main-container">
  <div class="row">
    <div class="col-sm" style="text-align: center">
      <div id="LeagueInfo">
      <LeagueInfo></LeagueInfo>
      </div>
    </div>
    <div class="col-sm">
      <Login v-if="!$root.store.username"></Login>
      <div v-else>
        <h5 id="favGames">My Favorite Games</h5>
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
      
    </div>
  </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import GamePreview from "../components/GamePreview";
import Login from "../components/Login";
export default {
  components: {
    LeagueInfo, 
    Login, 
    GamePreview
  },
  data() {
    return {
      games: this.$root.store.favoriteGames.slice(0,3)
    };
  },
};
</script>

<style lang="scss" scoped>
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

.col-sm{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin:50px;
}
.row{
  margin-right: 0;
}
#favGames{
  color:  rgb(111, 155, 197);
}
</style>
