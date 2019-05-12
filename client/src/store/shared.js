export default {
  state: {
    loading: false
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    setLoading(context, payload) {
      context.commit('setLoading', payload);
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    }
  }
}