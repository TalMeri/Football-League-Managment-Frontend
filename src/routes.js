import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/currentGames",
    name: "currentGames",
    component: () => import("./pages/CurrentGamesPage")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage")
  },
  {
    path: "/favoriteGames",
    name: "favoriteGames",
    component: () => import("./pages/FavoriteGamesPage")
  },
  {
    path: "/favoriteTeams",
    name: "favoriteTeams",
    component: () => import("./pages/FavoriteTeamsPage")
  },
  {
    path: "/favoritePlayers",
    name: "favoritePlayers",
    component: () => import("./pages/FavoritePlayersPage")
  },
  {
    path: "/PlayerPage/:id",
    name: "PlayerPage",
    component: () => import("./pages/PlayerPage")
  },
  {
    path: "/TeamPage/:id",
    name: "TeamPage",
    component: () => import("./pages/TeamPage")
  },
  {
    path: "/league",
    name: "league",
    component: () => import("./pages/LeaguePage")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
