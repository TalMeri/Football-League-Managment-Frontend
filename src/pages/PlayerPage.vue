<template>
  <div class="container">
    <h1 class="title">{{this.player.name}}</h1>
  <div class="row">
    <div v-if="this.player!=null" class="col-sm" style="text-align: center">
      <PlayerPreview
      :id="this.player.id" 
      :name="this.player.name" 
      :position="this.player.position" 
      :team_name="this.player.team_name" 
      :image="this.player.image"></PlayerPreview>
    </div>
    <div v-if="this.player!=null" class="col-sm">
      <PlayerInfo
        :common_name="this.player.common_name"
        :birthdate="this.player.birthdate"
        :birthcountry="this.player.birthcountry"
        :height="this.player.height"
        :weight="this.player.weight"
        :nationality="this.player.nationality"
      ></PlayerInfo>
    </div>
  </div>
  </div>
</template>

<script>
import PlayerInfo from "../components/PlayerInfo.vue";
import PlayerPreview from '../components/PlayerPreview.vue';
export default {
  components: {
    PlayerInfo, 
    PlayerPreview
  },
    data() {
        return {
            player:"",
            player_id:"",
            name:"",
            common_name:"",
            birthdate:"",
            birthcountry:"",
            team_name:"",
            position:"",
            image:"",
            height:"",
            weight:"",
            nationality:""
    };
  },
  methods: {
    async PlayerInfo(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/players/playerPage/"+
              this.$route.params.id.replace(":",""),
        );
        this.axios.defaults.withCredentials = false;
        this.player = response.data;
        console.log(response);
      } catch (error) {
        console.log("error in player page")
        console.log(error.response.data);
      }
    }
  }, 
  mounted(){
    console.log("Player page mounted");
    this.PlayerInfo(); 
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
