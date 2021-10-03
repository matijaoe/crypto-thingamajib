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
    removeFromFavorites(state: DefaultState, coinId: string) {
      const coinIndex = state.favoriteCoins.indexOf(coinId);
      if (coinIndex !== -1) {
        state.favoriteCoins.splice(coinIndex, 1);
      }
      console.log(`${coinId} removed from favs`);
    },
    addToFavorites(state: DefaultState, coinId: string) {
      state.favoriteCoins.push(coinId);
      console.log(`${coinId} added to favs`);
    },
  },
  actions: {
    toggleFavorites({ state, commit }, coinId: string) {
      if (state.favoriteCoins.includes(coinId)) {
        const mutation = state.favoriteCoins.includes(coinId)
          ? 'removeFromFavorites'
          : 'addToFavorites';
        commit(mutation, coinId);
      }
    },
  },
  modules: {
    currencies: currenciesModule,
  },
});
