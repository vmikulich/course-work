import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        categories: null,
        categoryById: null,
        categoryPositions: []
    },
    actions: {
        getCategories(context, payload) {
            axios.get(`http://localhost:5000/api/administrator/category`).then(res => {
                payload.loading = false;
                context.commit("setCategories", res.data);
            });
            
        },
        getCategoryById(context, payload) {
            axios.get(`http://localhost:5000/api/administrator/category/${payload}`)
                 .then(res => {
                    context.commit("setCategoryById", res.data)
                 });
        },
        createCategory(context, payload) {
            const fd = new FormData();
            if (payload.imageSrc) {
                fd.append('image', payload.imageSrc, payload.imageSrc.name)
            }
            fd.append('name', payload.name)
            axios.post(`http://localhost:5000/api/administrator/category`, fd)
                 
        },
        updateCategory(context, payload) {
            const fd = new FormData();
            if (payload.imageSrc) {
                fd.append('image', payload.imageSrc, payload.imageSrc.name)
            }
            fd.append('name', payload.name)
            axios.patch(`http://localhost:5000/api/administrator/category/${payload.id}`, payload)
        },
        deleteCategory(context, payload) {
            return axios.delete(`http://localhost:5000/api/administrator/category/${payload}`)
        },
        getPositions(context, payload) {
            axios.get(`http://localhost:5000/api/administrator/position/${payload}`)
                 .then(res => context.commit('setCategoryPositions', res.data))
        },
        createPosition(context, payload) {
            axios.post(`http://localhost:5000/api/administrator/position`, payload)
                 .then(() => context.commit('addPosition', payload));
        },
        updatePosition(context, payload) {
            axios.patch(`http://localhost:5000/api/administrator/position/${payload._id}`, payload)
                 .then(() => context.commit('updatePosition', payload));
        },
        deletePosition(context, payload) {
             axios.delete(`http://localhost:5000/api/administrator/position/${payload._id}`)
                  .then(() => context.commit('deletePosition', payload))
        }
    },
    mutations : {
        setCategories (state, payload) {
            state.categories = payload;
        },
        setCategoryById (state, payload) {
            state.categoryById = payload;
        },
        adCategory(state, payload) {
            state.categories.push(payload);
        },
        setCategoryPositions(state, payload) {
            state.categoryPositions = payload;
        },
        addPosition(state, payload) {
            state.categoryPositions.push(payload);
        },
        updatePosition(state, payload) {
            const idx = state.categoryPositions.findIndex(p => p._id === payload._id);
            state.categoryPositions[idx]
        },
        deletePosition(state, payload) {
            const idx = state.categoryPositions.findIndex(p => p._id === payload._id);
            state.categoryPositions.splice(idx, 1);
        }
    },
    getters: {
        categories(state) {
            return state.categories;
        },
        currentCategory(state) {
            return state.categoryById;
        },
        categoryPositions(state) {
            return state.categoryPositions;
        }
    }
})