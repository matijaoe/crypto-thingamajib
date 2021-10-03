import { createStore } from 'vuex';

import currenciesModule from './currencies';

interface DefaultState {
  coins: string[];
  currency: string;
}

export default createStore({
  state: (): DefaultState => ({
    coins: ['bitcoin'],
    currency: 'usd',
  }),
  mutations: {
    setCurrency(state: DefaultState, currency: string) {
      state.currency = currency;
    },
  },
  actions: {},
  modules: {
    currencies: currenciesModule,
  },
});
