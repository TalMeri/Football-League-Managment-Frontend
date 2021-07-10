<template>
<div class="container-team">
  <div class="team-preview">
    <div :title="id" @click="moveToTeamPage(id)" class="team-title">
      <b>Team Name:</b> {{ name }}
    </div>
    <div class="team=image" style="text-align: center">
    <img @click="moveToTeamPage(id)"
      :src="logo_path"
      class="card-img-bottom"
      style="min-height: 200px; width: auto; cursor: pointer;"
    />
    </div>
    <div class="team-button">
    <b-button v-if="$root.store.username" :disabled="this.$root.store.favoriteTeams.some(data=> data.id==id)" type="button" @click=addToFavorite>&#128077;</b-button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "TeamPreview",
  props: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      logo_path: {
        type: String,
        required: true
      }
  },
    methods: {
    async moveToTeamPage(id){
      this.$router.push(`/TeamPage/:${id}`);
    },
    async addToFavorite(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          "http://localhost:3000/users/favoriteTeams",
          {
            teamId: this.id.toString()
          }
        );
        this.axios.defaults.withCredentials = false;
        this.$root.store.favoriteTeams.push({id: this.id, name: this.name , logo_path: this.logo_path});
        this.$root.toast("Add to Favorite", "Team added successfully to favorite", "success");
        console.log(response);
      } catch (error) {
        console.log("error in add to favorite teams")
        console.log(error);
        this.$root.toast("Favorite Teams", error.response.data, "warning");
      }
    }
  },
  mounted(){
    console.log("team preview mounted")
  } 
};
</script>

<style>
.container-team{
  display: inline-block;
  text-align: center;
}
.team-preview {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 300px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 2px;
  border-color:cadetblue;
  background:rgba(255, 255, 255, 0.75);
  color:black;
}

.team-preview .team-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(8,54,116);
}
.team-title,.team-image,.team-button{
  flex-grow: 1;
}
.team-title:hover{
  color:rgb(111, 155, 197);
  cursor: pointer;
}
</style>
