<template>
  <div class="team-preview">
    <div :title="id" @click="moveToTeamPage(id)" class="team-title">
      <b>Team Name:</b> {{ name }}
    </div>
    <div style="text-align: center">
    <img
      :src="logo_path"
      class="card-img-bottom"
      style="height: 200px; width: auto"
    />
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamPreview",
  props: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      logo_path: {
        type: String,
        required: true
      }
  },
    methods: {
    async moveToTeamPage(id){
      this.$router.push(`/TeamPage/:${id}`);
    }
  },
  mounted(){
    console.log("team preview mounted")
  } 
};
</script>

<style>
.team-preview {
  display: inline-block;
  width: 250px;
  height: 250px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.team-preview .team-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}



</style>
