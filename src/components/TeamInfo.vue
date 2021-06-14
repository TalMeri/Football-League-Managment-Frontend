<template>
  <div class="team-info">
    <ul class="team-content">
      <li> <b>Twitter:</b> {{ twitter }}</li>
      <li> <b>Founded:</b> {{ founded }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TeamInfo",
  props: {
    twitter: {
        type: String,
        required: true
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
.team-info {
  display: inline-block;
  width: 250px;
  height: 320px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.team-info .team-content {
  width: 100%;
  overflow: hidden;
}



</style>
