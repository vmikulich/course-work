<template>
    <div class="categories">
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
    </div>
</template>




<script>
import axios from 'axios'


export default {
    name: 'Category',
    data() {
        return {
            categories: []
        }
    },
//     async mounted() {
//         this.categories = await axios.get(`localhost:5000/api/client/clientCategory`);
//     }
}
</script>

<style>

</style>
