<template>
  <div>
    <head>
       <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>
    <ul class="sidenav sidenav-fixed a-sidenav">
      <h4>Newborn</h4>

      <li class="bold active">
        <router-link v-for="link in links" class="waves-effect waves-orange" :to="link.path">{{link.name}}</router-link>
      </li>
    </ul>

    <main class="content">
      <router-view/>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large deep-orange darken-1">
        <i class="large material-icons">add</i>
      </a>
      <ul>
        <li><a class="btn-floating green"><i class="material-icons">assignment</i></a></li>
        <li><a class="btn-floating blue"><i class="material-icons">list</i></a></li>
       </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      links: [
        {
          name: 'Обзор',
          path: '/overview'
        },
        {
          name: 'Аналитика',
          path: '/analytics'
        },
        {
          name: 'История',
          path: '/history'
        },
        {
          name: 'Добавить заказ',
          path: '/add-order'
        },
        {
          name: 'Ассортимент',
          path: '/categories'
        },
      ]
    }
  }
}
</script>

<style src="materialize-css/dist/css/materialize.min.css">
  
</style>


