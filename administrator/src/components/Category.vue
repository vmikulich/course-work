<template>
    <div class="categories">
        <div class="page-title">
        <h4>Категории</h4>
            <router-link to="/categories/new">
                <button class="waves-effect waves-light btn grey darken-1">Добавить категорию</button>
            </router-link>
        </div>
        <div class="row" v-if="!loading">
            <div class="col s12">
                <div class="collection" v-if="categories.length !== 0">
                    <router-link :to="'/category/' + category._id" v-for="category in categories" class="collection-item">{{category.name}}</router-link >
                </div>
                <div v-else class="center">У вас нет категорий.</div>
            </div>
        </div>
        <Loader v-if="loading"/>
    </div>
</template>




<script>
import axios from 'axios'
import Loader from './Loader'


export default {
    name: 'Category',
    data() {
        return {
            categories: [],
            loading: false
        }
    },
    components: {Loader},
    mounted() {
        this.loading = true;
        axios.get(`http://localhost:5000/api/administrator/category`).then(res => {
            this.categories = res.data;
            this.loading = false;
        });
    }
}
</script>

<style>

</style>
