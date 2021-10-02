<template>
  <section class="coin-dashboard">
    <el-card class="box-card" v-for="(coin) in coins" :key="coin.id">
      <CoinData :coin-id="coin.id" />
    </el-card>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import CoinData from '@/components/CoinData.vue';
import { Coin } from '@/models/coins';
import { fetchCoins } from '@/api/cryptoApi';

const coins = ref<Coin[]>([]);

onMounted(async () => {
  try {
    coins.value = await fetchCoins({ perPage: 4 });
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
