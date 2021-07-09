<template>
  <div class="container-games">
    <h2>GAMES</h2>
<table class="table table-hover table-dark">
  <thead>
    <tr class="bg-primary">
      <th scope="col">Host Team</th>
      <th scope="col">Guest Team</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Field</th>
      <th scope="col">Referee</th>
    </tr>
  </thead>
  <tbody >
      <OldGameAsRow
      v-for="g in games"
      :id="g.game_id" 
      :hometeam="g.hometeam" 
      :awayteam="g.awayteam" 
      :game_date="g.game_date" 
      :game_time="g.game_time" 
      :field="g.feild" 
      :referee="g.referee" 
      :score="g.score" 
      :logevent="g.logevent" 
      :key="g.game_id"
      ></OldGameAsRow>
    </tbody>
</table>
<table class="table table-hover table-dark">
  <thead>
    <tr class="bg-primary">
      <th scope="col">Host Team</th>
      <th scope="col">Guest Team</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Field</th>
      <th scope="col">Referee</th>
      <th scope="col">Score</th>
      <th scope="col">Events</th>
    </tr>
  </thead>
  <tbody>
      <OldGameAsRow
      v-for="g in oldgames"
      :id="g.game_id" 
      :hometeam="g.hometeam" 
      :awayteam="g.awayteam" 
      :game_date="g.game_date" 
      :game_time="g.game_time" 
      :field="g.feild" 
      :referee="g.referee" 
      :score="g.score" 
      :logevent="g.logevent" 
      :key="g.game_id"
      ></OldGameAsRow>
    </tbody>
</table>
  </div>
</template>

<script>
//import GameAsRow from "../components/GameAsRow";
import OldGameAsRow from "../components/OldGameAsRow";
export default {
  components: {
    //GameAsRow,
    OldGameAsRow
  },
    data() {
        return {
            games: [],
            oldgames:[]
    };
  },
  methods: {
    async newGamesInfo(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/games/GetAllNewGames",
        );
        this.axios.defaults.withCredentials = false;
        const games = response.data;
        this.games = [];
        this.games.push(...games);
        console.log(response);
      } catch (error) {
        console.log("error in games page - new")
        console.log(error.response.data);
      }
    },
    async oldGamesInfo(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/games/GetAllOldGames",
        );
        this.axios.defaults.withCredentials = false;
        const oldgames = response.data;
        this.oldgames = [];
        this.oldgames.push(...oldgames);
        console.log(response);
      } catch (error) {
        console.log("error in games page - old")
        console.log(error.response.data);
      }
    }
  }, 
  mounted(){
    console.log("Player page mounted");
    this.newGamesInfo(); 
    this.oldGamesInfo();
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
.container-games{
  padding:50px;
}
</style>
