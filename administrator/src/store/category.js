import axios from 'axios'

export default {
    state: {
        categories: null,
        categoryById: null,
    },
    actions: {
        getCategories(context) {
            context.commit('setLoading', true);
            axios.get(`http://localhost:5000/api/administrator/category`).then(res => {
                context.commit("setCategories", res.data);
                context.commit('setLoading', false);
            });
            
        },
        getCategoryById(context, payload) {
            axios.get(`http://localhost:5000/api/administrator/category/${payload}`)
                 .then(res => {
                    context.commit("setCategoryById", res.data)
                 });
        },
        createCategory(context, payload) {
            context.commit('setLoading', true);
            const fd = new FormData();
            if (payload.imageSrc) {
                fd.append('image', payload.imageSrc, payload.imageSrc.name)
            }
            fd.append('name', payload.name)
            axios.post(`http://localhost:5000/api/administrator/category`, fd)
                 .then((res) => {
                    context.commit("adCategory", res.data);
                    context.commit('setLoading', false);
                })
                 
        },
        updateCategory(context, payload) {
            const fd = new FormData();
            if (payload.imageSrc) {
                fd.append('image', payload.imageSrc, payload.imageSrc.name)
            }
            fd.append('name', payload.name)
            axios.patch(`http://localhost:5000/api/administrator/category/${payload.id}`, fd)
        },
        deleteCategory(context, payload) {
            return axios.delete(`http://localhost:5000/api/administrator/category/${payload}`)
        },
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