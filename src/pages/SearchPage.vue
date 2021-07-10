<template>
  <div class="container-search">
    <h2 class="title">Search For Teams and Players</h2>
      <b-input-group prepend="Filter By:" id="filterby-input">
        <select class="custom-select" v-model="FilterBy">
          <option>No Filter</option>
          <option>Position</option>
          <option>Team Name</option>
          <option>Position and Team Name</option>
        </select>
      </b-input-group>
      <div v-if="this.FilterBy==`Position` || this.FilterBy==`Position and Team Name`"> 
        <b-input-group prepend="Position:" id="filter-position">
        <b-form-input v-model="positionFilter" id="positionFilter"></b-form-input>
        </b-input-group>
      </div>
      <div v-if="this.FilterBy==`Team Name` || this.FilterBy==`Position and Team Name`"> 
        <b-input-group prepend="Team Name:" id="filter-teamname">
        <b-form-input v-model="TeamNameFilter" id="teamNameFilter"></b-form-input>
        </b-input-group>
      </div>
      <b-input-group prepend="Search Query:" id="search-input">
      <b-form-input v-model="searchQuery" id="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button variant="info" @click="Search">Search</b-button>
      </b-input-group-append>
    </b-input-group>
    <div>
    <div v-if="this.players.length>0">
      <div class="search-player">
      <h4>Players</h4>
      <b-input-group prepend="Sort By:" id="sortby-player">
        <select class="custom-select" v-model="SortByPlayer">
          <option>Player Name</option>
          <option>Team Name</option>
        </select>
      </b-input-group>
      <b-input-group prepend="Order By:" id="orderby-player">
        <select class="custom-select" v-model="OrderByPlayer">
          <option>Ascending</option>
          <option>Descending</option>
        </select>
      </b-input-group>
      <b-button class="b-button" type="submit" @click="sortPlayer" variant="primary">Sort</b-button>
      </div>
      <br>
      <PlayerPreview
        v-for="p in players"
        :id="p.id" 
        :name="p.name" 
        :positionName="p.positionName"
        :positionId="p.positionId" 
        :team_name="p.team_name" 
        :image="p.image" 
        :key="p.id"></PlayerPreview>
      </div>
      <div v-if="this.teams.length>0">
        <div class="search-teams">
        <h4>Teams</h4>
      <b-input-group prepend="Sort By:" id="sortby-teams">
        <select class="custom-select" v-model="SortByTeam">
          <option>Team Name</option>
        </select>
      </b-input-group>
      <b-input-group prepend="Order By:" id="orderby-teams">
        <select class="custom-select" v-model="OrderByTeam">
          <option>Ascending</option>
          <option>Descending</option>
        </select>
      </b-input-group>
      <b-button class="b-button" type="submit" @click="sortTeam" variant="primary">Sort</b-button>
      </div>
      <br>
      <TeamPreview
        v-for="t in teams"
        :id="t.id"
        :name="t.name" 
        :logo_path="t.logo_path" 
        :key="t.id"></TeamPreview>
      </div>
  </div>
  </div>
</template>

<script>
import PlayerPreview from "../components/PlayerPreview";
import TeamPreview from "../components/TeamPreview";
export default {
  components: {
    PlayerPreview,
    TeamPreview
  },
 data() {
    return {
      searchQuery:"",
      teams: this.$root.store.lastTeams,
      players: this.$root.store.lastPlayers,
      SortByPlayer: "Player Name",
      OrderByPlayer: "Ascending",
      SortByTeam: "Team Name",
      OrderByTeam: "Ascending",
      FilterBy: "No Filter",
      positionFilter: "",
      TeamNameFilter: "",
      submitted: false
    };
  },
  methods: {
    async Search(){
      console.log("response");
      console.log(this.searchQuery);
      try {
        this.teams = [];
        this.players = [];
        if (this.searchQuery==""){//check if input exist
          this.$root.toast("Search", "Search input is missing", "warning");
          this.$root.store.lastSearch(this.teams, this.players);
          return;
        }
        if (!(this.searchQuery.replace(/\s/g, '').length)){//check if containing only spaces
          this.$root.toast("Search", "No Such Team or Player", "warning");
          this.$root.store.lastSearch(this.teams, this.players);
          return;
        }
        this.axios.defaults.withCredentials = true;
        let response;
        if (this.FilterBy == "No Filter"){
          response = await this.axios.get(
            "http://localhost:3000/search/searchByName/"+
                this.searchQuery,
        );}
        else if (this.FilterBy == "Position"){
          if (this.positionFilter==""){//check if input exist
            this.$root.toast("Search", "Filter input is missing", "warning");
            this.$root.store.lastSearch(this.teams, this.players);
            return;
          }
          if (!(this.positionFilter.replace(/\s/g, '').length)){//check if containing only spaces
          this.$root.toast("Search", "No Such Team or Player", "warning");
          this.$root.store.lastSearch(this.teams, this.players);
          return;
        }
          response = await this.axios.get(
            "http://localhost:3000/search/filterWithPosition/"+
                this.searchQuery+"/"+this.positionFilter,
        );}
        else if (this.FilterBy == "Team Name"){
          if (this.TeamNameFilter==""){//check if input exist
            this.$root.toast("Search", "Filter input is missing", "warning");
            this.$root.store.lastSearch(this.teams, this.players);
            return;
          }
          if (!(this.TeamNameFilter.replace(/\s/g, '').length)){//check if containing only spaces
          this.$root.toast("Search", "No Such Team or Player", "warning");
          this.$root.store.lastSearch(this.teams, this.players);
          return;
        }
          response = await this.axios.get(
            "http://localhost:3000/search/filterWithTeamName/"+
                this.searchQuery+"/"+this.TeamNameFilter,
        );}
        else if (this.FilterBy == "Position and Team Name"){
          if (this.positionFilter=="" || this.TeamNameFilter==""){//check if input exist
            this.$root.toast("Search", "Filter input is missing", "warning");
            this.$root.store.lastSearch(this.teams, this.players);
            return;
          }
        if (!(this.positionFilter.replace(/\s/g, '')) || !(this.TeamNameFilter.replace(/\s/g, '').length)){//check if containing only spaces
          this.$root.toast("Search", "No Such Team or Player", "warning");
          this.$root.store.lastSearch(this.teams, this.players);
          return;
        }
          response = await this.axios.get(
            "http://localhost:3000/search/filterWithPositionAndTeamName/"+
                this.searchQuery+"/"+this.positionFilter+"/"+this.TeamNameFilter,
        );}
        this.axios.defaults.withCredentials = false;
        console.log(response);
        let teams = response.data.teams;
        if (teams!=null){
          this.teams.push(...teams);
        }
        let players = response.data.players;
        if (this.FilterBy!="No Filter")
          players = response.data;
        if (players!=null){
          this.players.push(...players);
        }
        if (teams==null && players==null){
          this.$root.toast("Search", "No Such Team or Player", "warning");
        }
        console.log(response);
        this.$root.store.lastSearch(this.teams, this.players);
      } catch (error) {
        console.log("error in update teams")
        console.log(error);
        this.players = [];
        this.teams = [];
        this.$root.toast("Search", error.data, "warning");
      }
    },
    sortPlayer() {
      let x;
      console.log(this.players);
      if(this.SortByPlayer == "Player Name") {
        if(this.OrderByPlayer == "Ascending") {
          x = this.players.sort(function(a, b) {
            let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        })
        } else if(this.OrderByPlayer == "Descending") {
          x = this.players.sort(function(a, b) {
            let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return 1;
            if (nameA > nameB)
                return -1;
            return 0; //default return value (no sorting)
          })
        }
      }
      if(this.SortByPlayer == "Team Name") {
        if(this.OrderByPlayer == "Ascending") {
          x = this.players.sort(function(a, b) {
            let nameA=a.team_name.toLowerCase(), nameB=b.team_name.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        })
        } else if(this.OrderByPlayer == "Descending") {
          x = this.players.sort(function(a, b) {
            let nameA=a.team_name.toLowerCase(), nameB=b.team_name.toLowerCase();
            if (nameA < nameB) //sort string descending
                return 1;
            if (nameA > nameB)
                return -1;
            return 0; //default return value (no sorting)
          })
        }
      }
      this.players = x;
      console.log(this.players);
      this.$root.store.lastSearch(this.teams, this.players);
    },
    sortTeam() {
    let x;
    console.log(this.teams);
    console.log(this.OrderByTeam);
    if(this.OrderByTeam == "Ascending") {
      x = this.teams.sort(function(a, b) {
        let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        if (nameA < nameB) //sort string ascending
            return -1;
        if (nameA > nameB)
            return 1;
        return 0; //default return value (no sorting)
      })
      } else if(this.OrderByTeam == "Descending") {
        x = this.teams.sort(function(a, b) {
          let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
          if (nameA < nameB) //sort string ascending
              return 1;
          if (nameA > nameB)
              return -1;
          return 0; //default return value (no sorting)
        })
      }
      this.teams = x;
      console.log(this.teams);
      this.$root.store.lastSearch(this.teams, this.players);
    },
  },
};
</script>

<style scoped>

#search-input, #filter-position, #filter-teamname {
  margin-bottom: 20px; 
  width: 500px; 
  margin-left: auto;
  margin-right: auto;
}
.container-search{
  padding:50px;
  text-align: center;
  align-content: center;
  align-items: center;
}
#filterby-input, #sortby-player, #orderby-player,#orderby-teams,#sortby-teams {
  width: 320px; 
  padding-bottom:20px;
  margin-left: auto;
  margin-right: auto;
}
h4{
  color:white;
}
.search-teams,.search-player{
  max-width: 550px;
  padding:20px;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  color:white;
  text-align: center;
  background:rgba(0, 0, 0, 0.75);
}
</style>