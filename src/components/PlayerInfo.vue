<template>
  <div class="player-info">
    <div class="player-content">
      <div><b class="colored">Common Name:</b> {{ common_name }}</div>
      <div><b class="colored">Birthdate:</b> {{ birthdate }}</div>
      <div><b class="colored">Birth Country:</b> {{ birthcountry }}</div>
      <div><b class="colored">Height:</b> {{ height }}</div>
      <div><b class="colored">Weight:</b> {{ weight }}</div>
      <div><b class="colored">Nationality:</b> {{ nationality }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerPreview",
  props: {
    common_name: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    birthcountry: {
        type: String,
        required: true
    },
    height: {
        type: String,
    },
    weight: {
        type: String,
    },
    nationality: {
        type: String,
        required: true
    }
  }, 
  mounted(){
    console.log("player info mounted")
  } 
};
</script>

<style>
.player-info {
  color:white;
  float:left;
  max-width: 400px;
  padding:20px;
  border-radius: 10px;
  background:rgba(0, 0, 0, 0.75);
  height: 350px;
  position: relative;
  margin: 10px 10px;

}
.colored{
  color:rgb(111, 155, 197);
}
.player-content{
  text-align: left;
}

</style>
