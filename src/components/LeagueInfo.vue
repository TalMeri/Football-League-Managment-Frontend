<template>
    <div class="league-preview">
      <div class="show" v-if="leagueName.length>0">
      <div class="league-title">
        <b>{{leagueName}}</b><br/>
      </div>
      <div class="league-content">
        <b>Season:</b> {{ season }}
        <br/>
        <b>Stage:</b> {{ stage }}
        <br/>
        <br/>
        <div v-if="games!=null" id="nextGame">
          <b>NEXT GAME:</b>
          <GamePreview 
            :id="games.game_id"
            :hometeam="games.hometeam" 
            :awayteam="games.awayteam" 
            :game_date="games.game_date" 
            :game_time="games.game_time" 
            :field="games.feild" 
            :referee="games.referee" 
            :key="games.game_id"></GamePreview>
        </div>
      </div>
      </div>
      <div class="info" v-else>
        <h3>&#9917;SUPERLIGA&#9917;</h3>
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
      games: null
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
  height: 370px;
  position: relative;
  margin: 10px 10px;
  border-radius: 6px;
  background:rgba(255, 255, 255, 0.75);
  color:black;
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
#nextGame{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.info{
  margin-top: 150px;
}


</style>