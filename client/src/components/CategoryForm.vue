<template>
    <div class="mw80">
        <div class="page-title">
            <h4>
                <router-link to="/categories">{{currName}}</router-link>
            </h4>
        </div>
        
        <Position :categoryId="id"/>
    </div>
</template>


<script>
import Position from './Position'
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
import material from '../Materialize/material.js'

export default {
    name:'CategoryForm',
    data() {
        return {
            id: null,
            image: null,
            imagePreview: '',
            currName: '',
        }
    },
    components: {Position},
    validations: {
        currName: {
            required
        }
    },
    created() {
        if (this.$route.params.id) {
            this.id = this.$route.params.id;
            this.isNew = false;
        }
    },
    beforeDestroy(){
        this.$store.commit('setCategoryById', null)
    },
    mounted() {
        if (this.$route.params.id) {
            setTimeout(() => {
                material.updateTextFields();
            }, 200)
            
            axios.get(`http://localhost:5000/api/client/clientCategory/${this.id}`)
                 .then(res => {
                    //  console.log(res.data);
                    this.currName = res.data.name;
                    this.imagePreview = res.data.imageSrc;
                    // console.log(this.imagePreview);
                 });
            // this.$store.dispatch("getCategoryById", this.id);
        }
    },
    computed: {
        currentCategory() {
            if (this.$route.params.id) {
                const category = this.$store.getters.currentCategory || {};
                this.imagePreview = category.imageSrc;
                return category;
            } else {
                return {};
            }
        }
    },
}
</script>


<style>
    .fr {
        float: right;
    }
    .h200 {
        height: 200px;
    }
    .mw80 {
        margin: auto;
        max-width: 80%;
    }
</style>
