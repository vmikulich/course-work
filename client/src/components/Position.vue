<template>
    <div>
        <div class="filter js-filter-block">
            <div class="fr">
                <div class="col order">
                    <div class="input-field inline order-position-input">
                        <input type="text" id="name" v-model="name">
                        <label for="name">Название</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s4" v-for="position in filteredPos" :key="position.id">
                <div class="card">
                    <div class="card-image">
                        <img src="images/sample-1.jpg">
                    </div>
                    <div class="card-content">
                        <span class="card-title">{{position.name}}</span>
                        <p>{{position.description}}</p>
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
    props: ['categoryId'],
    data() {
        return {
            name: '',
            company: '',
            description: '',
            positionId: null,
            name: ''
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
</style>
