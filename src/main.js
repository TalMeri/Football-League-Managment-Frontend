import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  ModalPlugin
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  ModalPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);
axios.defaults.withCradentials=true;
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  lastTeams: JSON.parse(localStorage.getItem("lastTeams")) || [],
  lastPlayers: JSON.parse(localStorage.getItem("lastPlayers")) || [],
  favoriteGames: JSON.parse(localStorage.getItem("favoriteGames")) || [],
  favoriteTeams: JSON.parse(localStorage.getItem("favoriteTeams")) || [],
  favoritePlayers: JSON.parse(localStorage.getItem("favoritePlayers")) || [],

  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    this.lastTeams = [];
    this.lastPlayers = [];
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("lastTeams");
    localStorage.removeItem("lastPlayers");
    localStorage.removeItem("favoriteGames");
    localStorage.removeItem("favoriteTeams");
    localStorage.removeItem("favoritePlayers");
    this.username = undefined;
    this.lastTeams = [];
    this.lastPlayers = [];
    this.favoriteGames = [];
    this.favoriteTeams = [];
    this.favoritePlayers = [];
  },
  lastSearch(lastTeams, lastPlayers){
    if (this.username){
      localStorage.setItem("lastTeams", JSON.stringify(lastTeams));
      localStorage.setItem("lastPlayers", JSON.stringify(lastPlayers));
      this.lastTeams = lastTeams;
      this.lastPlayers = lastPlayers;
    }
    else{
      this.lastTeams = [];
      this.lastPlayers = [];
    }
  },
  addToFavoriteGames(favoriteGames){
    localStorage.setItem("favoriteGames", JSON.stringify(favoriteGames));
    this.favoriteGames = favoriteGames;
    console.log("favorite", this.favoriteGames);
  },
  addToFavoriteTeams(favoriteTeams){
    localStorage.setItem("favoriteTeams", JSON.stringify(favoriteTeams));
    this.favoriteTeams = favoriteTeams;
    console.log("favorite", this.favoriteTeams);
  },
  addToFavoritePlayers(favoritePlayers){
    localStorage.setItem("favoritePlayers", JSON.stringify(favoritePlayers));
    this.favoritePlayers = favoritePlayers;
    console.log("favorite", this.favoritePlayers);
  },
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    }
  },
  render: (h) => h(App)
}).$mount("#app");
