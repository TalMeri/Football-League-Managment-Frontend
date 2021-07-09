<template>
  <div class="container-login">
      <Login></Login>
  </div>
</template>

<script>
import Login from "../components/Login";
export default {
<<<<<<< HEAD
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required, 
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          "http://localhost:3000/Login",
          {
            username: this.form.username,
            password: this.form.password
          }
        );
        this.axios.defaults.withCredentials = false;
        console.log(response);
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.username);
        this.getFavorites();
        this.$root.toast("Login", "User logged in successfully", "success");
        this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
        this.$root.toast("Login", err.response.data, "warning");
      }
    },
    onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      this.Login();
    },
    async getFavorites(){
        try {
        this.axios.defaults.withCredentials = true;
        const favGames = await this.axios.get(
          "http://localhost:3000/users/favoriteGames",
        );
        this.axios.defaults.withCredentials = false;
        const games = favGames.data;
        this.$root.store.addToFavoriteGames(games);
        this.axios.defaults.withCredentials = true;
        const favPlayers = await this.axios.get(
          "http://localhost:3000/users/favoritePlayers",
        );
        this.axios.defaults.withCredentials = false;
        const players = favPlayers.data;
        this.$root.store.addToFavoritePlayers(players);
        this.axios.defaults.withCredentials = true;
        const favTeams = await this.axios.get(
          "http://localhost:3000/users/favoriteTeams",
        );
        this.axios.defaults.withCredentials = false;
        const teams = favTeams.data;
        this.$root.store.addToFavoriteTeams(teams);
        } catch (error) {
        console.log("error in update games")
        console.log(error.response.data);
        this.$root.toast("Favorite Games", error.response.data, "warning");
      }
    }
=======
  components: {
    Login
>>>>>>> 988c9f1d1ea68c336150804fcf9913f79689d848
  }
};
</script>

<style lang="scss" scoped>
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
.container-login{
    margin-top:50px;
    display: flex;
    justify-content: center;
}

</style>
