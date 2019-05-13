<template>
    <div>
        <div class="page-title">
            <h4>
                <router-link to="/categories">Категории</router-link>
                <i class="material-icons">keyboard_arrow_right</i>
                {{isNew ? 'Добавить' : 'Редактировать'}} категорию
            </h4>
            <span>
                <button 
                    class="btn btn-small red"
                    v-if="!isNew"
                    @click="deleteCategory()"
                >
                    <i class="material-icons">delete</i>
                </button>
            </span>
        </div>
        <div class="row">
            <form class="col s12 l6" @submit.prevent="onSubmit()">
                <div class="input-field">
                    <input 
                        id="name" 
                        type="text" 
                        @blur="$v.currName.$touch()"
                        v-model="currName"
                    >
                    <label for="name">Название</label>
                </div>
                <div>
                    <input 
                        type="file"
                        class="dn"
                        ref="input"
                        @change="onFileUpload($event)"
                    >
                    <button 
                        type="button"
                        class="waves-effect waves-light btn orange lighten-2 mb2"
                        @click="triggerClick()"
                    >
                        <i class="material-icons left">backup</i>
                        Загрузить изображение
                    </button>
                </div>

                <div>
                    <button 
                        type="submit"
                        class="`waves-effect waves-light btn `"
                        :disabled="$v.$invalid"
                    >
                        Сохранить изменения
                    </button>
                </div>
            </form>

            <div class="col s12 l4 center">
                <img 
                    class="responsive-img h200" 
                    :src="'http://localhost:5000/'+imagePreview"
                    v-if="imagePreview && id !== null"
                >
                <img 
                    class="responsive-img h200" 
                    :src="imagePreview"
                    v-if="imagePreview && id === null"
                >
                <!-- <img 
                    class="responsive-img h200" 
                    :src="imagePreview"
                    v-if="imagePreview && id === !null && isNew === false"
                > -->
            </div>
        </div>
        <Position
            v-if="id !== null"
            :categoryId="id"
        />
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
            isNew: true,
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
            
            axios.get(`http://localhost:5000/api/administrator/category/${this.id}`)
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
    methods: {
        onSubmit() {
            const category = {
                name: this.currName,
                imageSrc: this.image,
                id: this.id
            }
            if (this.isNew) {
                this.$store.dispatch('createCategory', category)
                           .then(() => {
                                    this.$router.push('/categories');
                                    material.toast('Категория создана');
                               });
            } else {
                this.$store.dispatch('updateCategory', category)
                           .then(() => material.toast('Изменения сохранены'));
            }
            
        },
        triggerClick() {
            this.$refs.input.click();
        },
        onFileUpload(event) {
            const file = event.target.files[0];
            this.image = file;

            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result;
            }
            reader.readAsDataURL(file);
        },
        deleteCategory() {
            const decision = window.confirm(`Вы уверены, что хотите удалить категорию ${this.currName}`);
            if(decision) {
                this.$store.dispatch('deleteCategory', this.id)
                           .then(() => this.$router.push('/categories'));
            }
        }
    }
}
</script>


<style>
    .dn {
        display: none;
    }
    .h200 {
        height: 200px;
    }
</style>
