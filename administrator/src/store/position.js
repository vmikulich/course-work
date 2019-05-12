import axios from 'axios'

export default {
    state: {
        categoryPositions: []
    },
    actions: {
        getPositions(context, payload) {
            context.commit('setLoading', true);
            axios.get(`http://localhost:5000/api/administrator/position/${payload}`)
                 .then(res => {
                     context.commit('setCategoryPositions', res.data);
                     context.commit('setLoading', false);
                })
        },
        createPosition(context, payload) {
            axios.post(`http://localhost:5000/api/administrator/position`, payload)
                 .then((res) => context.commit('addPosition', res.data));
        },
        updatePosition(context, payload) {
            return axios.patch(`http://localhost:5000/api/administrator/position/${payload._id}`, payload)
                //  .then(() => context.commit('updatePosition', payload));
        },
        deletePosition(context, payload) {
             axios.delete(`http://localhost:5000/api/administrator/position/${payload._id}`)
                  .then(() => context.commit('deletePosition', payload))
        }
    },
    mutations : {
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
        categoryPositions(state) {
            return state.categoryPositions;
        }
    },
}