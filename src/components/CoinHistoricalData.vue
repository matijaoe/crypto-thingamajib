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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-alert-triangle"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 9v2m0 4v.01" />
        <path
          d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75"
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
import { useStore } from 'vuex';
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

const { state } = useStore();
console.log(state);

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

  &__thumb {
    width: 24px;
    height: 24px;
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
