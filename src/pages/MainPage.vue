<template>
  <div class="main-container">
  <div class="row">
    <div class="col-sm">
      <div id="LeagueInfo">
      <LeagueInfo></LeagueInfo>
      </div>
    </div>
    <div class="col-sm">
      <div v-if="!$root.store.username">
        <Login></Login>
      </div>
        <div v-else>
        <h2 id="favGames">My Favorite Games</h2>
        <MainFavorite></MainFavorite>
        </div>
      
    </div>
  </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import MainFavorite from "../components/MainFavorite";
import Login from "../components/Login";
export default {
  components: {
    LeagueInfo, 
    Login, 
    MainFavorite
  },
};
</script>

<style lang="scss" scoped>
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

.col-sm{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin:50px;
}
.row{
  margin-right: 0;
}
</style>
