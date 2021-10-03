import { createStore } from 'vuex';

import currenciesModule from './currencies';

interface DefaultState {
  coins: string[];
  currency: string;
  favoriteCoins: string[];
}

export default createStore({
  state: (): DefaultState => ({
    coins: ['bitcoin'],
    currency: 'usd',
    favoriteCoins: ['bitcoin', 'ethereum', 'cardano', 'nano'],
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
