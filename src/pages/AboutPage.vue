<template>
  <div class="container-about">
      <div class="about-info">
      <h2>About Us &#128526;</h2>
      <p>This site was built by Stav Tsabari and Tal Meridor <br><br>
      In this site you can check the games of the season and search for players and teams. <br>
      You can also check their pages that full of info you have to know! <br><br>
      <b>For register users ONLY!</b><br>
       You can mark players, teams and games as favorite.<br>
      <br></p>
      <h5>Also Create By Us:</h5>
        <a href="https://web-development-environments-2021.github.io/assignment2_313261257_316296912/">pacman</a><br>
        <a href="https://web-development-environments-2021.github.io/316296912/">Phoebe site</a><br>
        <a href="https://web-development-environments-2021.github.io/313261257/">Kris Jenner site</a><br>
      </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
.container-about{
    margin-top:50px;
    display: flex;
    justify-content: center;
}
.about-info{
    max-width: 550px;
    padding:20px;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    color:white;
    text-align: center;
    background:rgba(0, 0, 0, 0.75);
}

</style>
