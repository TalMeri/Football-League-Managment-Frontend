<template>
  <div class="container-right">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin()">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Login</b-button
      >
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
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
        // this.$root.loggedIn = true;
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.username);
        this.$root.toast("Login", "User logged in successfully", "success");
        await this.getFavoriteGames();
        await this.getFavoritePlayers();
        await this.getFavoriteTeams();
        this.$emit('moveto');
      } catch (err) {
        console.log(err);
        // this.form.submitError = err.response.data.message;
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
    async getFavoriteGames(){
        try {
        this.axios.defaults.withCredentials = true;
        const favGames = await this.axios.get(
          "http://localhost:3000/users/favoriteGames",
        );
        this.axios.defaults.withCredentials = false;
        const games = favGames.data;
        this.$root.store.addToFavoriteGames(games);
        } catch (error) {
        console.log("error in get favorite games")
        console.log(error.response.data);
      }
    },
        async getFavoritePlayers(){
        try {
        this.axios.defaults.withCredentials = true;
        const favPlayers = await this.axios.get(
          "http://localhost:3000/users/favoritePlayers",
        );
        this.axios.defaults.withCredentials = false;
        const players = favPlayers.data;
        this.$root.store.addToFavoritePlayers(players);
        } catch (error) {
        console.log("error in get favorite players")
        console.log(error.response.data);
      }
    },
        async getFavoriteTeams(){
        try {
        this.axios.defaults.withCredentials = true;
        const favTeams = await this.axios.get(
          "http://localhost:3000/users/favoriteTeams",
        );
        this.axios.defaults.withCredentials = false;
        const teams = favTeams.data;
        this.$root.store.addToFavoriteTeams(teams);
        } catch (error) {
        console.log("error in get favorite teams")
        console.log(error.response.data);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container-right {
  max-width: 400px;
  padding:20px;
  border-radius: 10px;
  color:white;
  text-align: center;
  background-color: rgba($color: #000000cb, $alpha: 0.7);
}
</style>
