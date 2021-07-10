<template>
  <div class="container-league">
    <h2>Manage League</h2>
    <div class="row">
      <div class="col-sm" id="leftSort">
        <b-input-group prepend="Sort By:" id="sortby-input">
          <select class="custom-select" v-model="SortBy">
            <option>Date</option>
            <option>Team Name</option>
          </select>
        </b-input-group>
        <b-input-group prepend="Order By:" id="orderby-input">
          <select class="custom-select" v-model="OrderBy">
            <option>Ascending</option>
            <option>Descending</option>
          </select>
        </b-input-group>
        <b-button class="b-button" type="submit" @click="sort" variant="primary">Sort</b-button>
      </div>
      <div class="col-sm" id="rightSort">
        <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">Add New Game</b-button>
      </div>
    </div>
      <br>
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
      <th scope="col">Add as Favorite</th>
    </tr>
  </thead>
  <tbody>
      <OldGameAsRow
      v-for="g in games"
      :id="g.game_id" 
      :type="g.type"
      :hometeam="g.hometeam" 
      :hometeamId="g.hometeamId"
      :awayteam="g.awayteam"
      :awayteamId="g.awayteamId" 
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
<div>

  <b-modal id="bv-modal-example" hide-footer>
    <template #modal-title>
      Add New Game
    </template>
    <div class="d-block text-center">
      <AddNewGame @updateTable="AllGamesInfo"></AddNewGame>
    </div>
    <!-- <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button> -->
  </b-modal>
</div>
  </div>
</template>

<script>
import OldGameAsRow from "../components/OldGameAsRow";
import AddNewGame from "../components/AddNewGame";
export default {
  components: {
    OldGameAsRow,
    AddNewGame
  },
    data() {
        return {
            games: [],
            SortBy: "",
            OrderBy: "",
            submitted: false
    };
  },
  methods: {
    async AllGamesInfo(){
      console.log("response");
      try {
        this.games=[]
        this.axios.defaults.withCredentials = true;
        const response1 = await this.axios.get(
          "http://localhost:3000/games/GetAllNewGames",
        );
        this.axios.defaults.withCredentials = false;
        const games = response1.data;
        for (let i=0; i<games.length;i++){
          games[i]['type'] = 'New'
          this.games.push(games[i])
        }
        this.axios.defaults.withCredentials = true;
        const response2 = await this.axios.get(
          "http://localhost:3000/games/GetAllOldGames",
        );
        this.axios.defaults.withCredentials = false;
        const oldgames=response2.data;
        for (let i=0; i<oldgames.length;i++){
          oldgames[i]['type'] = 'Old'
          this.games.push(oldgames[i])
        }
        console.log(this.games)
      } catch (error) {
        console.log("error in games page")
        console.log(error);
      }
    },
    sort() {
      let x;
      console.log(this.games);
      if(this.SortBy == "Date") {
        if(this.OrderBy == "Ascending") {
          x = this.games.sort(function(a, b) {
            let temp_datea = String(a.game_date).split('-');
            console.log(temp_datea)
            let temp_dateb = String(b.game_date).split('-');
            let temp_timea = String(a.game_time).replace(":","");
            let temp_timeb = String(b.game_time).replace(":","")
            if (parseInt(temp_datea[0],10)>parseInt(temp_dateb[0],10)){
                return 1;
            }
            else if(parseInt(temp_datea[0],10)<parseInt(temp_dateb[0],10)){
                return -1;
            }
            else{
                if (parseInt(temp_datea[1],10)>parseInt(temp_dateb[1],10)){
                    return 1;
                }
                else if(parseInt(temp_datea[1],10)<parseInt(temp_dateb[1],10)){
                    return -1;
                }
                else{
                    if (parseInt(temp_datea[2],10)>parseInt(temp_dateb[2],10)){
                        return 1;
                    }
                    else if(parseInt(temp_datea[2],10)<parseInt(temp_dateb[2],10)){
                        return -1;
                    }
                    else{
                        if (parseInt(temp_timea,10)>parseInt(temp_timeb,10)){
                            return 1;
                        }
                        else if(parseInt(temp_timea,10)<parseInt(temp_timeb,10)){
                            return -1;
                        }
                        else{
                            return 0;
                        }
                    }
                }
            }
        })
        } else if(this.OrderBy == "Descending") {
          x = this.games.sort(function(a, b) {
            let temp_datea = String(a.game_date).split('-');
            let temp_dateb = String(b.game_date).split('-');
            let temp_timea = String(a.game_time).replace(":","");
            let temp_timeb = String(b.game_time).replace(":","")
            if (parseInt(temp_datea[0],10)>parseInt(temp_dateb[0],10)){
                return -1;
            }
            else if(parseInt(temp_datea[0],10)<parseInt(temp_dateb[0],10)){
                return 1;
            }
            else{
                if (parseInt(temp_datea[1],10)>parseInt(temp_dateb[1],10)){
                    return -1;
                }
                else if(parseInt(temp_datea[1],10)<parseInt(temp_dateb[1],10)){
                    return 1;
                }
                else{
                    if (parseInt(temp_datea[2],10)>parseInt(temp_dateb[2],10)){
                        return -1;
                    }
                    else if(parseInt(temp_datea[2],10)<parseInt(temp_dateb[2],10)){
                        return 1;
                    }
                    else{
                        if (parseInt(temp_timea,10)>parseInt(temp_timeb,10)){
                            return -1;
                        }
                        else if(parseInt(temp_timea,10)<parseInt(temp_timeb,10)){
                            return 1;
                        }
                        else{
                            return 0;
                        }
                    }
                }
            }
        })
        }
      }
      else if(this.SortBy == "Team Name") {
        if(this.OrderBy == "Ascending") {
          x = this.games.sort(function(a, b) {
            let nameA=a.hometeam.toLowerCase(), nameB=b.hometeam.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        })
        } else if(this.OrderBy == "Descending") {
          x = this.games.sort(function(a, b) {
            let nameA=a.hometeam.toLowerCase(), nameB=b.hometeam.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return 1;
            if (nameA > nameB)
                return -1;
            return 0; //default return value (no sorting)
          })
        }
      }
      this.games = x;
      console.log(this.games);
    }
  }, 
  mounted(){
    console.log("Player page mounted");
    this.AllGamesInfo(); 
  }
};
</script>

<style lang="scss" scoped>
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
.container-league{
  padding:50px;
}
#leftSort{
  text-align: left;
}
#rightSort{
  text-align: right;
}
#orderby-input,#sortby-input {
  width: 250px; 
  padding-bottom:5px;
}
</style>
