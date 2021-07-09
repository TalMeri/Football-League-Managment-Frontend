<template>
  <div class="container">
    <h1 class="title">{{this.team.name}}</h1>
  <div class="row">
    <div v-if="this.team!=null" class="col-sm" style="text-align: center">
      <TeamPreview
      :id="this.team.id" 
      :name="this.team.name" 
      :logo_path="this.team.logo_path"></TeamPreview>
    </div>
    <div v-if="this.team!=null" class="col-sm">
      <TeamInfo
        :twitter="this.team.twitter"
        :founded="this.team.founded"
      ></TeamInfo>
    </div>
  </div>
  <div class="row">
<PlayerPreview
    v-for="p in players"
      :id="p.id" 
      :name="p.name" 
      :position="p.position" 
      :team_name="p.team_name" 
      :image="p.image" 
      :key="p.player_id">
</PlayerPreview>      
  </div>
  <div class="row">
      <GamePreview
        v-for="g in games"
        :id="g.game_id" 
        :hometeam="g.hometeam" 
        :awayteam="g.awayteam" 
        :game_date="g.game_date" 
        :game_time="g.game_time" 
        :field="g.feild" 
        :referee="g.referee" 
        :key="g.game_id">
      </GamePreview>
  </div>
  <div class="row">
      <OldGameInfo
        v-for="o in oldgames"
        :id="o.game_id" 
        :hometeam="o.hometeam" 
        :awayteam="o.awayteam" 
        :game_date="o.game_date" 
        :game_time="o.game_time" 
        :field="o.feild" 
        :referee="o.referee" 
        :logevent="o.logevent"
        :score="o.score"
        :key="o.game_id">
      </OldGameInfo>
  </div>
  </div>
</template>

<script>
import PlayerPreview from '../components/PlayerPreview.vue';
import TeamPreview from '../components/TeamPreview.vue';
import GamePreview from '../components/GamePreview.vue';
import TeamInfo from '../components/TeamInfo.vue';
import OldGameInfo from '../components/OldGameInfo.vue'
export default {
  components: {
    TeamInfo, 
    TeamPreview,
    PlayerPreview,
    GamePreview,
    OldGameInfo
  },
    data() {
        return {
            twitter:"",
            founded:"",
            team: null,
            players:[],
            games:[],
            oldgames:[]

    };
  },
  methods: {
    async TeamInfo(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/teams/teamFullDetails/"+
              this.$route.params.id.replace(":",""),
        );
        this.axios.defaults.withCredentials = false;
        console.log(response);
        const team = response.data;
        this.team = team.team;
        this.players = [];
        this.players.push(...team.players);
        this.games = [];
        this.games.push(...team.new_games);
        this.oldgames = [];
        this.oldgames.push(...team.old_games);
      } catch (error) {
        console.log("error in team page")
        console.log(error.response);
      }
    }
  }, 
  mounted(){
    console.log("team page mounted");
    this.TeamInfo(); 
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
