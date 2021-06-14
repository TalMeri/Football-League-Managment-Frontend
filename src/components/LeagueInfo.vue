<template>
    <div class="league-preview">
      <div class="league-title">
        <b>{{leagueName}}</b><br/>
      </div>
      <div class="league-content">
        <b>Season:</b> {{ season }}
        <br/>
        <b>Stage:</b> {{ stage }}
        <br/>
        <div>
          <GamePreview style="text-align: left"
            :id="this.games.game_id"
            :hometeam="this.games.hometeam" 
            :awayteam="this.games.awayteam" 
            :game_date="this.games.game_date" 
            :game_time="this.games.game_time" 
            :field="this.games.feild" 
            :referee="this.games.referee" 
            :key="this.games.game_id"></GamePreview>
        </div>
      </div>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  components: {
    GamePreview: GamePreview
  }, 
 data() {
    return {
      leagueName: "", 
      season: "", 
      stage: "",
      games: ""
    };
  },
   methods: {
    async leagueInfo(){
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/league/getDetails",
        );
        const leagueinfo = response.data;
        this.leagueName = leagueinfo.league_name;
        this.season = leagueinfo.current_season_name;
        this.stage = leagueinfo.current_stage_name;
        this.games = leagueinfo.next_game;
        console.log(response);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.leagueInfo(); 
  }
};

</script>

<style>
.league-preview {
  display: inline-block;
  width: 350px;
  height: 330px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(44, 89, 116);
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
  text-align: center;
}

</style>