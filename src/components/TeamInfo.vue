<template>
  <div class="container-teaminfo">
    <div class="team-content">
       <div v-if="twitter!=null"><b class="colored">Twitter:</b> {{ twitter }}</div>
       <div v-else><b class="colored">Twitter:</b> Not Found</div>
      <div><b class="colored">Founded:</b> {{ founded }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamInfo",
  props: {
    twitter: {
        type: String,
    },
    founded: {
        type: Number,
        required: true
    }
  }, 
  mounted(){
    console.log("team info mounted")
  } 
};
</script>

<style>
.container-teaminfo {
  color:white;
  float:left;
  max-width: 400px;
  min-width: 200px;
  padding:20px;
  border-radius: 10px;
  background:rgba(0, 0, 0, 0.75);
  height: 200px;
  position: relative;
  margin: 10px 10px;

}
.colored{
  color:rgb(111, 155, 197);
}
.team-content{
  text-align: left;
}

</style>
