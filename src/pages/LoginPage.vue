<template>
  <div class="container-login">
      <Login @moveto="moveto"></Login>
  </div>
</template>

<script>
import Login from "../components/Login";
export default {
  components: {
    Login
  },
  methods:{
    moveto(){
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
.container-login{
    margin-top:50px;
    display: flex;
    justify-content: center;
}

</style>
