import { readonly, ref } from 'vue';
import { Coin, CoinFetchObject } from '@/models/coins';
import { fetchCoins } from '@/api/cryptoApi';

const coins = ref<Coin[]>([]);

export default () => {
  const fetchLatestCoins = async (options: CoinFetchObject) => {
    coins.value = await fetchCoins(options);
  };

  return {
    coins: readonly(coins),
    fetchLatestCoins,
  };
};
