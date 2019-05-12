import axios from 'axios'

export default {
    state: {
        categoryPositions: []
    },
    actions: {
        getPositions(context, payload) {
            context.commit('setLoading', true);
            axios.get(`http://localhost:5000/api/client/clientPosition/${payload}`)
                 .then(res => {
                     context.commit('setCategoryPositions', res.data);
                     context.commit('setLoading', false);
                })
        },
    },
    mutations : {
        setCategoryPositions(state, payload) {
            state.categoryPositions = payload;
        },
    },
    getters: {
        categoryPositions(state) {
            return state.categoryPositions;
        }
    },
}