<template>
  <div id="app">
    <!-- <img src="@/assets/style.png" alt="" class="back"> -->
    <!-- nav就是header～～～～～ -->
    <!-- <router-view name="nav" class="sidebar" v-if="this.$store.state.header"/> -->
    <router-view/>
     
    
  </div>
</template>

<script>

export default {
  name: 'App',
  
  
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap');

html, body {
  font-family: 'Nanum Myeongjo', serif;
}

#app {
  font-family: 'Nanum Myeongjo', serif;
} */
*{
  font-family:Arial, Helvetica, sans-serif;
}


</style>
