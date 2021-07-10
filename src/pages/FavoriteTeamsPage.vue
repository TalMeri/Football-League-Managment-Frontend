<template>
  <div class="container-favTeam">
    <h2 class="title">Favorite Teams</h2>
      <FavoriteTeams></FavoriteTeams>
  </div>
</template>

<script>
import FavoriteTeams from "../components/FavoriteTeams";
export default {
  components: {
    FavoriteTeams
  }
};
</script>

<style lang="scss" scoped>
.container-favTeam{
  padding:50px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

</style>
