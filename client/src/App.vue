<template>
  <div>
    <nav>
      <div class="nav-wrapper grey darken-1">
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
