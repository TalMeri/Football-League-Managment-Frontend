<template>
  <div class="container">
    <h1 class="title">Favorite Players</h1>
      <FavoritePlayers></FavoritePlayers>
  </div>
</template>

<script>
import FavoritePlayers from "../components/FavoritePlayers";
export default {
  components: {
    FavoritePlayers
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
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
