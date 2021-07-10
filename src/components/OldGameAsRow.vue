<template>
    <tr>
      <td style="cursor: pointer;">{{ hometeam }}</td>
      <td style="cursor: pointer;">{{ awayteam }}</td>
      <td>{{ game_date }}</td>
      <td>{{ game_time }}</td>
      <td>{{ field }}</td>
      <td>{{ referee }}</td>
      <td v-if="score!=undefined">{{score}}</td>
      <td v-else></td>
      <td v-if="logevent!=undefined"><EventInfo       
      v-for="e in logevent"
      :minute="e.gamemin" 
      :event="e.event" 
      :key="e.gamemin+e.event"></EventInfo></td>
      <td v-else></td>
      <td v-if="type=='New' && $root.store.username"><b-button class="b-button" :disabled="this.$root.store.favoriteGames.some(data=> data.game_id==id)" @click=addToFavorite> &#128077; </b-button>
</td>
    <td v-else></td>
    </tr>
</template>

<script>
import EventInfo from "../components/EventInfo";
export default {
  components: {
    EventInfo
  },
  name: "GamePreview",
  props: {
      id: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      hometeam: {
        type: String,
        required: true
      },
      awayteam: {
        type: String,
        required: true
      },
      game_date: {
        type: String,
        required: true
      },
      game_time: {
        type: String,
        required: true
      },
      field: {
        type: String,
        required: true
      },
      referee: {
        type: String,
        required: true
      },
      score: {
        type: String,
      },
      logevent: {
        type: Array,
      }
  }, 
  methods: {
    async addToFavorite(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        let idToSend = this.id.toString();
        console.log(this.id)
        const response = await this.axios.post(
          "http://localhost:3000/users/favoriteGames",
          {
            gameId: this.id.toString()
          }
        );

        this.axios.defaults.withCredentials = false;
        this.$root.store.favoriteGames.push({game_id: this.id, hometeam: this.hometeam , awayteam: this.awayteam, game_date:this.game_date, game_time:this.game_time, feild:this.field, referee:this.referee });
        this.$root.toast("Add to Favorite", "Game added successfully to favorite", "success");
        console.log(response);
      } catch (error) {
        console.log("error in Game")
        console.log(error);
        this.$root.toast("Games", error.response.data, "warning");
      }
    }
  },
  mounted(){
    console.log("game preview mounted")
  } 
};
</script>

<style> 
</style>
