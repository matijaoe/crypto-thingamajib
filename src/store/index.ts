import { createStore } from 'vuex';

export default createStore({
  state: {
    coins: ['bitcoin'],
    currency: 'eth',
  },
  mutations: {
    setCurrency(state, currency: string) {
      state.currency = currency;
    },
  },
  actions: {},
  modules: {},
});
