import axios from 'axios'

export default {
    state: {
        categories: null,
        categoryById: null,
    },
    actions: {
        getCategories(context) {
            context.commit('setLoading', true);
            axios.get(`http://localhost:5000/api/client/clientCategory`).then(res => {
                context.commit("setCategories", res.data);
                context.commit('setLoading', false);
            });
            
        },
        getCategoryById(context, payload) {
            axios.get(`http://localhost:5000/api/client/clientCategory/${payload}`)
                 .then(res => {
                    context.commit("setCategoryById", res.data)
                 });
        },
    },
    mutations : {
        setCategories (state, payload) {
            state.categories = payload;
        },
        setCategoryById (state, payload) {
            state.categoryById = payload;
        },
    },
    getters: {
        categories(state) {
            return state.categories;
        },
        currentCategory(state) {
            return state.categoryById;
        },
    },
}