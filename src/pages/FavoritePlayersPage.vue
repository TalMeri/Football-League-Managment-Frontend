<template>
  <div class="container-favPlayer">
    <h2 class="title">Favorite Players</h2>
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
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
.container-favPlayer{
  padding:50px;
}

</style>
