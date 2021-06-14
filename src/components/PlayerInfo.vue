<template>
  <div class="player-info">
    <ul class="player-content">
      <li> <b>Common Name:</b> {{ common_name }}</li>
      <li> <b>Birthdate:</b> {{ birthdate }}</li>
      <li> <b>Birth Country:</b> {{ birthcountry }}</li>
      <li> <b>Height:</b> {{ height }}</li>
      <li> <b>Weight:</b> {{ weight }}</li>
      <li> <b>Nationality:</b> {{ nationality }}</li>
    </ul>
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
        required: true
    },
    weight: {
        type: String,
        required: true
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

.player-info .player-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.player-info .player-content {
  width: 100%;
  overflow: hidden;
}



</style>
