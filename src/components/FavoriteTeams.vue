<template>
  <div>
    <TeamPreview
        v-for="t in teams"
        :id="t.id"
        :name="t.name" 
        :logo_path="t.logo_path" 
        :key="t.id"></TeamPreview>
  </div>
</template>

<script>
import TeamPreview from "./TeamPreview.vue";
export default {
  name: "FavoriteTeams",
  components: {
    TeamPreview: TeamPreview
  }, 
  data() {
    return {
      teams: []
    };
  },
  methods: {
    async updateTeams(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteTeams",
        );
        this.axios.defaults.withCredentials = false;
        const teams = response.data;
        this.teams = [];
        this.teams.push(...teams);
        console.log(response);
      } catch (error) {
        console.log("error in update teams")
        console.log(error.response.data);
        this.$root.toast("Favorite Teams", error.response.data, "warning");
      }
    }
  }, 
  mounted(){
    console.log("favorite teams mounted");
    this.updateTeams(); 
  }
};
</script>

<style></style>
