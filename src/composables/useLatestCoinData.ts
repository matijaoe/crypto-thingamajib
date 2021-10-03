import { readonly, ref } from 'vue';
import { Coin } from '@/models/coins';
import { SimpleSingleCoin } from '@/models/simple-coins';
import { fetchCoins } from '@/api/cryptoApi';

const coins = ref<Coin[]>([]);

export default () => {
  const fetchLatestCoins = async (options: SimpleSingleCoin) => {
    coins.value = await fetchCoins(options);
  };

  return {
    coins,
    fetchLatestCoins,
  };
};
