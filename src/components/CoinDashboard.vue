<template>
  <section class="coin-dashboard">
    <base-card class="card" v-for="(coin) in coins" :key="coin.id">
      <CoinData :coin-id="coin.id" />
    </base-card>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import CoinData from '@/components/CoinData.vue';
import useRequest from '@/composables/useRequest';
import { Coin } from '@/models/coins';

const fetchTopCoins = async (perPage = 6) => {
  const { payload, makeRequest } = useRequest();
  const baseUrl = 'https://api.coingecko.com/api/v3';
  const url = `${baseUrl}/coins/markets?ids=&vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h`;
  await makeRequest(url);
  return payload.value;
};

const coins = ref<Coin[]>([]);

onMounted(async () => {
  try {
    const fullCoinData: Coin[] | null = await fetchTopCoins();
    if (fullCoinData) {
      coins.value = fullCoinData;
    }
  } catch (err) {
    console.error(err);
  }
});

</script>

<style lang="scss" scoped>
.coin-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 1.6rem;
}
</style>
