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
            context.commit('setLoading', true);
            const fd = new FormData();
            if (payload.imageSrc) {
                fd.append('image', payload.imageSrc, payload.imageSrc.name)
            }
            fd.append('name', payload.name)
            fd.append('company', payload.company)
            fd.append('description', payload.description)
            fd.append('link', payload.link)
            fd.append('category', payload.category)
            axios.post(`http://localhost:5000/api/administrator/position`, fd)
                 .then((res) => {
                    context.commit("addPosition", res.data);
                    context.commit('setLoading', false);
                })
        },
        updatePosition(context, payload) {
            const fd = new FormData();
            if (payload.imageSrc) {
                fd.append('image', payload.imageSrc, payload.imageSrc.name)
            }
            fd.append('name', payload.name)
            fd.append('company', payload.company)
            fd.append('description', payload.description)
            fd.append('link', payload.link)
            fd.append('category', payload.category)
            return axios.patch(`http://localhost:5000/api/administrator/position/${payload._id}`, fd)
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