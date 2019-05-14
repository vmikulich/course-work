<template>
    <div class="container">
        <h2 class="grey-text text-darken-2">Категории</h2>
        <div class="row" v-if="!loading">
            <div class="col s6 m6" v-for="category in categories" :key="category.id">
                <div class="card">
                    <router-link class="card-image" :to="{name: 'CategoryForm', params: {id: category._id}}" >
                        <img 
                            class="h300" 
                            :src="'http://localhost:5000/'+category.imageSrc"     
                        >
                        <span class="card-title">{{category.name}}</span>
                    </router-link>
                </div>
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
    components: {Loader},
     mounted() {
            this.$store.dispatch("getCategories");
    },
    computed: {
        categories() {
            return this.$store.getters.categories || [];
        },
        loading() {
            return this.$store.getters.loading;
        }
    },
}

</script>

<style>
    .h300 {
        height: 300px;
    }
</style>
