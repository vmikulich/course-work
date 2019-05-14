<template>
    <div>
        <div v-if="isFilterActive" class="page-title">
            <div class="fr">
                <div class="">
                    <div class="input-field inline order-position-input">
                        <input type="text" id="name" v-model="name">
                        <label for="name">Название</label>
                    </div>
                </div>
                <div class="ml40">
                    <div class="input-field inline order-position-input">
                        <input type="text" id="company" v-model="company">
                        <label for="company">Компания</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s4" v-for="position in filteredPos" :key="position.id">
                <div class="card">
                    <div class="card-image">
                        <img 
                            class="h300" 
                            :src="'http://localhost:5000/'+position.imageSrc"
                        >
                    </div>
                    <div class="card-content">
                        <span class="card-title">{{position.name}}</span>
                        <span>Компания: {{position.company}}</span>
                        <p>{{position.description}}</p>
                    </div>
                    <div class="card-action">
                        <a :href="position.link" target="_blank">This is a link</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import Loader from './Loader'


export default {
    name: 'Position',
    props: ['categoryId','isFilterActive'],
    data() {
        return {
            name: '',
            company: '',
            description: '',
            positionId: null,
            name: '',
            company: ''
        }
    },
    components: {Loader},
    mounted() {
        this.$store.dispatch('getPositions', this.categoryId);
    },
    beforeDestroy(){
        this.$store.commit('setCategoryPositions', [])
    },
    computed: {
        positions() {
            return this.$store.getters.categoryPositions || [];
        },
        filteredPos() {
            return this.positions.filter(item => item.name.toLowerCase().includes(this.name.trim().toLowerCase()))
                                 .filter(item => item.company.toLowerCase().includes(this.company.trim().toLowerCase()))
                                 .slice()
        },
        loading() {
            return this.$store.getters.loading;
        }
    },
}
</script>


<style>
    .textarea {
        width: 500px;
    }
    .h300 {
        height: 250px;
    }
    .ml40 {
        margin-left: 40px;
    }
</style>
