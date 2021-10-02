<template>
  <!-- eslint-disable max-len -->
  <div v-if="coin && coin.id" class="coin">
    <div class="coin__data">
      <img class="coin__thumb" :src="coin.image.thumb" />
      <h2 class="coin__name">{{ coin.name }}</h2>
      <span class="coin__ticker">{{ coin.symbol }}</span>
    </div>
    <p class="coin__price" v-if="priceInUSD">${{ formatPrice(priceInUSD) }}</p>
    <p v-else class="coin__price--error">
      No price
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"
        />
      </svg>
    </p>
  </div>
  <div v-else>
    <p>No coin found</p>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable camelcase */

import {
  defineProps, reactive, computed, watchEffect,
} from 'vue';
import { formatDate } from '../utils/dates';
import { formatPrice } from '../utils/numbers';
import useDatePicker from '@/composables/useDatePicker';
import { CoinHistorical } from '@/models/coins';
import { fetchCoinHistoryData } from '@/api/cryptoApi';

const props = defineProps<{
  coinId: string;
}>();

const { date } = useDatePicker();
const coin = reactive<CoinHistorical | Record<string, never>>({});

const unpackCoinData = (coinData: CoinHistorical | Record<string, never>) => {
  try {
    const {
      id,
      symbol,
      name,
      image,
      developer_data,
      community_data,
      market_data,
    } = coinData;

    coin.id = id;
    coin.name = name;
    coin.symbol = symbol;
    coin.image = image;
    coin.market_data = market_data;
    coin.developer_data = developer_data;
    coin.community_data = community_data;
  } catch (err) {
    console.error(err);
  }
};

const priceInUSD = computed(() => coin?.market_data?.current_price?.usd);

const formattedDate = computed(() => formatDate(date.value, 'dd-MM-yyyy'));

watchEffect(async () => {
  if (date.value) {
    try {
      const coinData = await fetchCoinHistoryData(props.coinId, formattedDate.value);
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
    gap: 0.8rem;
    margin-bottom: 0.8rem;
  }

  &__name {
    font-size: 2rem;
    font-weight: bold;
    line-height: 1;
    margin: 0.8rem 0;
  }

  &__ticker {
    position: absolute;
    top: -1rem;
    right: -1rem;
    font-weight: bold;
    text-transform: uppercase;
    transform: rotate(12deg);
    padding: 0.2rem 0.6rem;
    border-radius: var(--border-radius);
    background: var(--gray-200);
    color: var(--gray-600);
    font-size: 1.2rem;
  }

  &__price {
    font-size: 2rem;

    &--error {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
  }
}

.card {
  &:hover {
    .coin__ticker {
      background: var(--primary-100);
      color: var(--primary-700);
    }
  }
}
</style>
