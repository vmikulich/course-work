<template>
    <div>
        <div class="row">
            <div class="col s12">
                <div class="page-subtitle">
                    <h4>Позиции:</h4>
                    <button 
                        class="waves-effect waves-light btn grey darken-1 btn-small"
                        @click="onAddPosition()"
                    >
                        Добавить позицию
                    </button>
                </div>

                <div class="collection" v-if="positions.length !== 0">
                    <a 
                        class="collection-item collection-item-icon" 
                        v-for="position in positions"
                        :key="position.id"
                        @click="onSelectPosition(position)"
                    >
                        <div>
                            <p>Название: <strong>{{position.name}}</strong></p>
                            <p>Компания: <strong>{{position.company}}</strong></p>
                            <p>Описание: <strong>{{position.description}}</strong></p>
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
        <form @submit.prevent="onSubmit()">
            <div class="modal" ref="modal">
                <div class="modal-content">
                    <h4 class="mb1">Добавить позицию</h4>
                    <div class="input-field">
                        <input id="pos-name" type="text" v-model="name" required>
                        <label for="pos-name">Название</label>
                    </div>
                    <div class="input-field">
                        <input id="pos-cost" type="text" v-model="company" required>
                        <label for="pos-cost">Компания</label>
                    </div>
                    <div class="input-field">
                        <textarea id="textarea1" class="materialize-textarea" v-model="description" required></textarea>
                        <label for="textarea1">Описание</label>
                        <!-- <input id="pos-cost" type="text" v-model="description" required>
                        <label for="pos-cost">Описание</label> -->
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


export default {
    name: 'Position',
    props: ['categoryId'],
    data() {
        return {
            modal: null,
            name: '',
            company: '',
            description: '',
            positionId: null
        }
    },
    mounted() {
        this.modal = this.initModal();
        this.$store.dispatch('getPositions', this.categoryId);
    },
    beforeDestroy(){
        this.modal.destroy();
        this.$store.commit('setCategoryPositions', [])
    },
    computed: {
        positions() {
            return this.$store.getters.categoryPositions || [];
        }
    },
    methods: {
        initModal() {
            return M.Modal.init(this.$refs.modal);
        },
        onSelectPosition(position) {
            this.positionId = position._id;
            this.name = position.name;
            this.company = position.company;
            this.description = position.description;
            this.modal.open();
            M.updateTextFields();
        },
        onAddPosition() {
            this.positionId = null;
            this.name = '';
            this.company = '';
            this.description = '';
            this.modal.open();
            M.updateTextFields();
        },
        onCancel() {
            this.modal.close();
        },
        onSubmit() {
            const position = {
                name: this.name,
                company: this.company,
                description: this.description,
                category: this.categoryId
            }
            if (this.positionId) {
               position._id = this.positionId;
               this.$store.dispatch('updatePosition', position)
                    .then(() => {
                        this.$store.dispatch('getPositions', this.categoryId);
                        M.toast('Изменения сохранены');
                        this.modal.close();
                        this.resetForm();
                        
                    })
                this.$store.dispatch('getPositions', this.categoryId);
            } else {
                this.$store.dispatch('createPosition', position)
                    .then(() => {
                        M.toast('Позиция создана');
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
        }
    }
}
</script>


<style>

</style>
