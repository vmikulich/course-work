<template>
  <div>
    <ul class="sidenav sidenav-fixed a-sidenav">
      <h4>Newborn</h4>
      <li class="bold"><a href="#" class="waves-effect waves-orange">Обзор</a></li>
      <li class="bold"><a href="#" class="waves-effect waves-orange">Аналитика</a></li>
      <li class="bold"><a href="#" class="waves-effect waves-orange">История</a></li>
      <li class="bold"><a href="#" class="waves-effect waves-orange">Добавить заказ</a></li>
      <li class="bold active"><a href="#" class="waves-effect waves-orange">Ассортимент</a></li>
      <li class="bold last"><a href="#" class="waves-effect waves-orange">Выйти</a></li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
import Category from './components/Category.vue'

export default {
  name: 'app',
}
</script>

<style>
@import "~materialize-css/dist/css/materialize.min.css";
@import "theme/styles.min.css";

</style>
