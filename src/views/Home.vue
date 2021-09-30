<template>
  <div>
    <div class="coin__header">
      <p v-if="date" class="coin__date">
        Price on
        <span class="coin__date--value">{{ formatDate(date, 'MMMM do, yyyy') }}</span>
      </p>
      <DatePicker @date-change="setDate" />
    </div>
    <div v-if="coin.symbol">
      <div class="coin__data">
        <img :src="coin.image.thumb" />
        <h1 class="coin__name">{{ coin.name }}</h1>
        <span class="coin__ticker">({{ coin.symbol }})</span>
      </div>
      <h2>${{ formatPrice(coin.price) }}</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watchEffect } from 'vue';
import DatePicker from '@/components/DatePicker.vue';
import {
  formatDate,
} from '../helpers/dates';
import { formatPrice } from '../helpers/numbers';

const date = ref<string>('');

const setDate = (newDate: string) => {
  date.value = newDate;
};

interface Coin {
  name: string,
  symbol: string,
  image: {
    thumb: string,
    small: string
  }
  price: number
}

const coin = reactive<Coin | Record<string, never>>({});

const fetchCoinData = async (coinId: string, formattedDate: string) => {
  const baseUrl = 'https://api.coingecko.com/api/v3';
  const res = await fetch(`${baseUrl}/coins/${coinId}/history?date=${formattedDate}&localization=false`);
  const data = await res.json();
  console.log(data);
  return data;
};

const setCoinData = (coinData: any) => {
  const {
    // eslint-disable-next-line camelcase
    symbol, name, market_data, image,
  } = coinData;
  const { usd: price } = market_data.current_price;

  coin.name = name;
  coin.symbol = symbol;
  coin.image = image;
  coin.price = price;

  console.log(coin);
};

watchEffect(async () => {
  if (date.value) {
    const coinId = 'bitcoin';
    try {
      const formattedDate = formatDate(date.value, 'dd-MM-yyyy');
      const coinData = await fetchCoinData(coinId, formattedDate);
      setCoinData(coinData);
    } catch (error) {
      console.error(error);
    }
  }
});

</script>

<style lang="scss" scoped>
.coin {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 8rem;
  }

  &__name {
    font-size: 3rem;
    line-height: 1;
    margin: 0;
  }

  &__ticker {
    font-weight: bold;
    text-transform: uppercase;
  }

  &__price {
    &--value {
    }
  }

  &__date {
    font-style: italic;

    &--value {
      font-weight: bold;
    }
  }

  &__data {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    margin-bottom: 0.8rem;
  }
}
</style>
