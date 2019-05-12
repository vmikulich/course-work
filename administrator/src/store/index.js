import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import shared from './shared'
import category from './category'
import position from './position'

Vue.use(Vuex);

export default new Vuex.Store({
    // state: {
    //     categories: null,
    //     categoryById: null,
    //     categoryPositions: []
    // },
    // actions: {
    //     getCategories(context, payload) {
    //         context.commit('setLoading', true);
    //         axios.get(`http://localhost:5000/api/administrator/category`).then(res => {
    //             context.commit("setCategories", res.data);
    //             context.commit('setLoading', false);
    //         });
            
    //     },
    //     getCategoryById(context, payload) {
    //         axios.get(`http://localhost:5000/api/administrator/category/${payload}`)
    //              .then(res => {
    //                 context.commit("setCategoryById", res.data)
    //              });
    //     },
    //     createCategory(context, payload) {
    //         context.commit('setLoading', true);
    //         const fd = new FormData();
    //         if (payload.imageSrc) {
    //             fd.append('image', payload.imageSrc, payload.imageSrc.name)
    //         }
    //         fd.append('name', payload.name)
    //         axios.post(`http://localhost:5000/api/administrator/category`, fd)
    //              .then((res) => {
    //                 context.commit("adCategory", res.data);
    //                 context.commit('setLoading', false);
    //             })
                 
    //     },
    //     updateCategory(context, payload) {
    //         const fd = new FormData();
    //         if (payload.imageSrc) {
    //             fd.append('image', payload.imageSrc, payload.imageSrc.name)
    //         }
    //         fd.append('name', payload.name)
    //         axios.patch(`http://localhost:5000/api/administrator/category/${payload.id}`, payload)
    //     },
    //     deleteCategory(context, payload) {
    //         return axios.delete(`http://localhost:5000/api/administrator/category/${payload}`)
    //     },
    //     getPositions(context, payload) {
    //         context.commit('setLoading', true);
    //         axios.get(`http://localhost:5000/api/administrator/position/${payload}`)
    //              .then(res => {
    //                  context.commit('setCategoryPositions', res.data);
    //                  context.commit('setLoading', false);
    //             })
    //     },
    //     createPosition(context, payload) {
    //         axios.post(`http://localhost:5000/api/administrator/position`, payload)
    //              .then((res) => context.commit('addPosition', res.data));
    //     },
    //     updatePosition(context, payload) {
    //         return axios.patch(`http://localhost:5000/api/administrator/position/${payload._id}`, payload)
    //             //  .then(() => context.commit('updatePosition', payload));
    //     },
    //     deletePosition(context, payload) {
    //          axios.delete(`http://localhost:5000/api/administrator/position/${payload._id}`)
    //               .then(() => context.commit('deletePosition', payload))
    //     }
    // },
    // mutations : {
    //     setCategories (state, payload) {
    //         state.categories = payload;
    //     },
    //     setCategoryById (state, payload) {
    //         state.categoryById = payload;
    //     },
    //     adCategory(state, payload) {
    //         state.categories.push(payload);
    //     },
    //     setCategoryPositions(state, payload) {
    //         state.categoryPositions = payload;
    //     },
    //     addPosition(state, payload) {
    //         state.categoryPositions.push(payload);
    //     },
    //     updatePosition(state, payload) {
    //         const idx = state.categoryPositions.findIndex(p => p._id === payload._id);
    //         state.categoryPositions[idx]
    //     },
    //     deletePosition(state, payload) {
    //         const idx = state.categoryPositions.findIndex(p => p._id === payload._id);
    //         state.categoryPositions.splice(idx, 1);
    //     }
    // },
    // getters: {
    //     categories(state) {
    //         return state.categories;
    //     },
    //     currentCategory(state) {
    //         return state.categoryById;
    //     },
    //     categoryPositions(state) {
    //         return state.categoryPositions;
    //     }
    // },
    modules: {
        shared, category, position
    }
})