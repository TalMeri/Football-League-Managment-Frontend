<template>
  <div class="team-preview">
    <div :title="id" @click="moveToTeamPage(id)" class="team-title">
      <b>Team Name:</b> {{ name }}
    </div>
    <div style="text-align: center">
    <img
      :src="logo_path"
      class="card-img-bottom"
      style="height: 200px; width: auto"
    />
    <b-button v-if="$root.store.username" :disabled="this.$root.store.favoriteTeams.some(data=> data.id==id)" type="button" @click=addToFavorite>&#128077;</b-button>
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
            teamId: this.id
          }
        );
        this.axios.defaults.withCredentials = false;
        this.$root.store.favoriteTeams.push({id: this.id, name: this.name , logo_path: this.logo_path});
        console.log(response);
      } catch (error) {
        console.log("error in add to favorite teams")
        console.log(error);
        this.$root.toast("Favorite Teams", error.data, "warning");
      }
    }
  },
  mounted(){
    console.log("team preview mounted")
  } 
};
</script>

<style>
.team-preview {
  display: inline-block;
  width: 250px;
  height: 250px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.team-preview .team-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}



</style>
