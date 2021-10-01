<template>
  <div v-if="coin.symbol">
    <div class="coin__data">
      <img :src="coin.image.thumb" />
      <h2 class="coin__name">{{ coin.name }}</h2>
      <span class="coin__ticker">{{ coin.symbol }}</span>
    </div>
    <p class="coin__price" v-if="coin.price">${{ formatPrice(coin.price) }}</p>
    <p v-else>No price</p>
  </div>
  <div v-else>
    <p>No coin found</p>
  </div>
</template>

<script lang="ts" setup>
import {
  defineProps, reactive, computed, watchEffect,
} from 'vue';
import {
  formatDate,
} from '../utils/dates';
import { formatPrice } from '../utils/numbers';
// Composables
import useRequest from '@/composables/useRequest';
import useDatePicker from '@/composables/useDatePicker';
import { CoinHistorical, SimpleCoin } from '@/models/coins';

const props = defineProps<{
  coinId: string,
}>();

const { date } = useDatePicker();

const coin = reactive<SimpleCoin | Record<string, never>>({});

const fetchCoinData = async (formattedDate: string) => {
  const { payload, makeRequest } = useRequest();
  const baseUrl = 'https://api.coingecko.com/api/v3';
  const url = `${baseUrl}/coins/${props.coinId}/history?date=${formattedDate}&localization=false`;
  await makeRequest(url);
  return payload.value;
};

const unpackCoinData = (coinData: CoinHistorical) => {
  if (coinData) {
    try {
      const {
        // eslint-disable-next-line camelcase
        symbol, name, image,
      } = coinData;

      coin.name = name;
      coin.symbol = symbol;
      coin.image = image;
      coin.price = 'market_data' in coinData
        ? coinData.market_data?.current_price?.usd || null
        : null;
    } catch (err) {
      console.error(err);
    }
  } else {
    coin.symbol = null;
  }
};

const formattedDate = computed(() => formatDate(date.value, 'dd-MM-yyyy'));

watchEffect(async () => {
  if (date.value) {
    try {
      const coinData = await fetchCoinData(formattedDate.value);
      if (coinData) {
        unpackCoinData(coinData);
      }
    } catch (error) {
      console.error(error);
    }
  }
});
</script>

<style lang="scss" scope>
.coin {
  &__data {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    margin-bottom: 0.8rem;
  }

  &__name {
    font-size: 2.4rem;
    line-height: 1;
    margin: 0.8rem 0;
  }

  &__ticker {
    font-weight: bold;
    text-transform: uppercase;
    transform: translateY(-1rem) rotate(4deg) translateX(-0.8rem);
    padding: 0.2rem 0.6rem;
    border-radius: var(--border-radius);
    background: var(--primary-light);
    color: var(--primary-dark);
    font-size: 1.4rem;
  }

  &__price {
    font-size: 2rem;
  }
}
</style>
