<template>
  <div>
    <ul class="sidenav sidenav-fixed a-sidenav">
      <h4>Newborn</h4>
      <li class="bold"><a href="#" class="waves-effect waves-orange">Обзор</a></li>
      <li class="bold"><a href="#" class="waves-effect waves-orange">Аналитика</a></li>
      <li class="bold"><a href="#" class="waves-effect waves-orange">История</a></li>
      <li class="bold"><a href="#" class="waves-effect waves-orange">Добавить заказ</a></li>
      <li class="bold active"><router-link class="waves-effect waves-orange" to="/categories">Ассортимент</router-link></li>
    </ul>
    <main class="content">
      <div class="page-title">
        <h4>Категории</h4>
        <button class="waves-effect waves-light btn grey darken-1">Добавить категорию</button>
    </div>

    <div class="row">
        <div class="col s12">
            <div class="collection">
                <a href="#!" class="collection-item">Категория 1</a>
                <a href="#!" class="collection-item">Категория 1</a>
                <a href="#!" class="collection-item">Категория 1</a>
                <a href="#!" class="collection-item">Категория 1</a>
                <a href="#!" class="collection-item">Категория 1</a>
                <a href="#!" class="collection-item active">Категория 2</a>
                <a href="#!" class="collection-item">Категория 1</a>
                <a href="#!" class="collection-item">Категория 1</a>
            </div>
        </div>
    </div>
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
}
</script>

<style src="materialize-css/dist/css/materialize.min.css">

</style>

