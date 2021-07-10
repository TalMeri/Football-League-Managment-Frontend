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
      teams: this.$root.store.favoriteTeams
    };
  },
  mounted(){
    console.log("favorite teams mounted");
    if (!(this.teams.length>0))
    {
      this.$root.toast("Favorite teams", "No Favorite teams", "warning");
    }
    //this.updateTeams(); 
  }
};
</script>

<style></style>
