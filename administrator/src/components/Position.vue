<template>
    <div>
        <div class="row" v-if="!loading">
            <div class="col s12">
                <div class="page-subtitle">
                    <h4>Позиции:</h4>
                    <button 
                        class="waves-effect waves-light btn grey darken-1 btn-small"
                        @click="onAddPosition()"
                    >
                        Добавить позицию
                    </button>
                     <!-- <button 
                        class="waves-effect waves-light btn grey darken-1 btn-small"
                        @click="upLoadPosition()"
                    >
                        Загрузить позиции
                    </button> -->
                </div>

                <div class="collection" v-if="positions.length !== 0">
                    <a 
                        class="collection-item collection-item-icon" 
                        v-for="position in positions"
                        :key="position.id"
                        @click="onSelectPosition(position)"
                    >
                        <div>
                            <p><strong>Название:  </strong>{{position.name}}</p>
                            <p><strong>Компания:  </strong>{{position.company}}</p>
                            <p><strong>Описание:  </strong>{{position.description}}</p>
                        </div>
                        <span>
                            <i 
                                class="material-icons" 
                                @click="onDeletePosition($event, position)"
                            >
                            delete
                            </i>
                        </span>
                    </a>
                </div>
                <div v-else class="center">В категории нет позиций</div>
            </div>
        </div>
        <Loader v-if="loading"/>
        <form @submit.prevent="onSubmit()">
            <div class="modal" ref="modal">
                <div class="modal-content">
                    <h4 class="mb1">{{positionId === null ? 'Добавить' : 'Редактировать'}} позицию</h4>
                    <div class="input-field">
                        <input 
                            id="pos-name" 
                            type="text"
                            @blur="$v.name.$touch()"
                            v-model="name" 
                            required
                        >
                        <label for="pos-name">Название</label>
                    </div>
                    <div class="input-field">
                        <input 
                            id="pos-cost" 
                            type="text" 
                            v-model="company" 
                            @blur="$v.company.$touch()"
                            required
                        >
                        <label for="pos-cost">Компания</label>
                    </div>
                    <div class="input-field">
                        <input 
                            id="pos-cost" 
                            type="text" 
                            v-model="link" 
                            @blur="$v.link.$touch()"
                            required
                        >
                        <label for="pos-cost">ССылка</label>
                    </div>
                    <div class="input-field">
                        <textarea 
                            id="textarea1" 
                            class="materialize-textarea" 
                            v-model="description" 
                            @blur="$v.description.$touch()"
                            required
                        >
                        </textarea>
                        <label for="textarea1">Описание</label>
                    </div>
                </div>
                <div class="flex">
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
                    <div class="col s12 l4 ">
                        <img 
                            class="responsive-img h200" 
                            :src="imageSrc"
                            v-if="imageSrc"
                        >
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button 
                        type="button"
                        class="modal-action waves-effect waves-black btn-flat"
                        @click="onCancel()"
                    >
                        Отмена
                    </button>
                    <button 
                        :disabled="$v.$invalid"
                        type="submit"
                        class="modal-action btn waves-effect"
                    >Сохранить</button>
                </div>
            </div>
        </form>
    </div>
</template>


<script>
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
import material from '../Materialize/material.js'
import Loader from './Loader'
// import first from '../parsers/first.js'


export default {
    name: 'Position',
    props: ['categoryId'],
    data() {
        return {
            modal: null,
            name: '',
            company: '',
            description: '',
            link: '',
            positionId: null,
            imageSrc: '',
            image: ''
        }
    },
    components: {Loader},
    mounted() {
        this.modal = this.initModal();
        // console.log(first);
        this.$store.dispatch('getPositions', this.categoryId);
    },
    beforeDestroy(){
        this.modal.destroy();
        this.$store.commit('setCategoryPositions', [])
    },
    validations: {
        name: {
            required
        },
        company: {
            required
        },
        description: {
            required
        },
        link: {
            required
        },
    },
    computed: {
        positions() {
            return this.$store.getters.categoryPositions || [];
        },
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        initModal() {
            return M.Modal.init(this.$refs.modal);
        },
        onSelectPosition(position) {
            setTimeout(() => {
                material.updateTextFields();
            }, 200)
            this.positionId = position._id;
            this.name = position.name;
            this.company = position.company;
            this.description = position.description;
            this.link = position.link;
            this.imageSrc = position.imageSrc;
            this.modal.open();
        },
        onAddPosition() {
            this.positionId = null;
            this.name = '';
            this.company = '';
            this.description = '';
            this.link = '';
            this.imageSrc = '';
            this.modal.open();
        },
        onCancel() {
            this.modal.close();
        },
        onSubmit() {
            const position = {
                name: this.name,
                company: this.company,
                description: this.description,
                link: this.link,
                imageSrc: this.image,
                category: this.categoryId
            }
            if (this.positionId) {
               position._id = this.positionId;
               
               this.$store.dispatch('updatePosition', position)
                    .then(() => {
                        this.$store.dispatch('getPositions', this.categoryId);
                        material.toast('Изменения сохранены');
                        this.modal.close();
                        this.resetForm();
                        
                    })
                this.$store.dispatch('getPositions', this.categoryId);
            } else {
                this.$store.dispatch('createPosition', position)
                    .then(() => {
                        material.toast('Позиция создана');
                        this.modal.close();
                        this.resetForm();
                    })
            }
            
        },
        onDeletePosition(event, position) {
            event.stopPropagation();
            const decision = window.confirm(`Вы уверены, что хотите удалить позицию ${position.name}`);
            if(decision) {
                this.$store.dispatch('deletePosition', position);
            }
        },
        resetForm() {
            this.name = '';
            this.company = '';
            this.description = '';
            this.link = '';
        },
        triggerClick() {
            this.$refs.input.click();
        },
        onFileUpload(event) {
            const file = event.target.files[0];
            this.image = file;
            console.log(this.image);

            const reader = new FileReader();
            reader.onload = () => {
                this.imageSrc = reader.result;
            }
            reader.readAsDataURL(file);
        },
        // upLoadPosition() {
            // axios.get('http://localhost:5000/data/clothes.json')
            //      .then(res => {
            //          console.log(res.data);
            //      }).catch(err => {
            //          console.log('Error')
            //      })
            // let xhr = new XMLHttpRequest();


            // const jsonUrl='http://localhost:5000/data/food.json';
            // fetch('../../../data/food.json')
            // .then( res => res.json() )
            // .then( (data) => {
            //     console.log(data)
            // })
            // fetch(jsonUrl,{mode:'cors'})
            // .then(
            //     function(response) {
            //     if (response.status !== 200) {
            //         console.log(response);
            //         return;
            //     }

            //     // Examine the text in the response
            //     response.json().then(function(data) {
            //         console.log(response);
            //     });
            //     }
            // )
            // .catch(function(err) {
            //     console.log('Fetch Error :-S', err);
            // });

        // }
    
    }
}
</script>


<style>
    .textarea {
        width: 500px;
    }
    .flex {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>
