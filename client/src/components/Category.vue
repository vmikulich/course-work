<template>
    <div class="container">
        <div class="row" v-if="!loading">
            <div class="col s6 m6" v-for="category in categories" :key="category.id">
                <div class="card">
                    <router-link class="card-image" :to="{name: 'CategoryForm', params: {id: category._id}}" >
                        <img src="../../../uploads/10052019-190325_885-basketball.jpg">
                        <span class="card-title bold">{{category.name}}</span>
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
    .mw80 {
        margin: auto;
        max-width: 80%;
    }
</style>
