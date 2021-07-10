<template>
  <div id="app">
    <b-navbar class="navbar navbar-dark bg-dark" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }">Superliga Vue</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>

        <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
        <b-nav-item :to="{ name: 'currentGames' }">Games</b-nav-item>
        <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        <b-nav-item v-if="$root.store.username=='manager'" :to="{ name: 'league' }">Manage Leauge</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item >Hello, Guest</b-nav-item>
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item-dropdown right>
          <template #button-content >
            {{$root.store.username}}
          </template>
          <b-dropdown-item :to="{ name: 'favoriteGames' }">My Games</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'favoriteTeams' }">My Teams</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'favoritePlayers'}">My Players</b-dropdown-item>
          <b-dropdown-item @click="Logout()">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div id="pages">
    <router-view />
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    async Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.axios.defaults.withCredentials = true;
      const response = await this.axios.post(
          "http://localhost:3000/logout",
        );
      this.axios.defaults.withCredentials = false;
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   min-height: 100vh;
  background: url('background7.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  text-align: center;
}
h2{
  color:white;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.bg-info{
  background-color:#313d3f !important;
}

</style>
