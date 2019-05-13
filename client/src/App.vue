<template>
  <div>
    <nav>
      <div class="nav-wrapper grey darken-1">
        <img class="png" src="./assets/phoenix.png" alt="">
        <router-link to="/categories" class="brand-logo">Newborn</router-link>
      </div>
  </nav>
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'app',
}
</script>

<style src="materialize-css/dist/css/materialize.min.css">


</style>

<style scoped>
  .png {
    width: 65px;
    margin-right: 10px;
  }
</style>

