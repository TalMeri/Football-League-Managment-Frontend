<template>
  <div class="container-favgames">
    <h2 class="title">Favorite Games</h2>
      <FavoriteGames></FavoriteGames>
  </div>
</template>

<script>
import FavoriteGames from "../components/FavoriteGames";
export default {
  components: {
    FavoriteGames
  }
};
</script>

<style lang="scss" scoped>
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
.container-favgames{
  padding:50px;
}
</style>
