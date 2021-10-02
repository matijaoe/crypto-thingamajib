<template>
  <section class="coin-dashboard">
    <base-card class="coin-card" v-for="coin in coins" :key="coin.id">
      <CoinData :coin-id="coin.id" />
    </base-card>
    <el-pagination
      v-if="totalPages"
      background
      layout="prev, pager, next"
      :total="totalPages"
      @current-change="changePage"
    ></el-pagination>
  </section>
</template>

<script lang="ts" setup>
import {
  ref, onMounted, watch, computed,
} from 'vue';
import CoinData from '@/components/CoinData.vue';
import { Coin } from '@/models/coins';
import { fetchCoins, fetchAllCoinsIds } from '@/api/cryptoApi';

const coins = ref<Coin[]>([]);
const page = ref<number>(1);
const perPage = ref<number>(4);
const totalCount = ref<number>(0);

const totalPages = computed(() => totalCount.value / perPage.value);

const setCoins = async () => {
  try {
    coins.value = await fetchCoins({ perPage: perPage.value, page: page.value });
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  const allIds = await fetchAllCoinsIds();
  totalCount.value = allIds?.length || 0;
  await setCoins();
});

watch(page, setCoins);

const changePage = (currentPage: number) => {
  page.value = currentPage;
};
</script>

<style lang="scss" scoped>
.coin-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 1.6rem;
}

.coin-card {
  min-height: 14.1rem;
}
</style>
