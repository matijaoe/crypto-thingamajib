<template>
  <section class="coin-dashboard">
    <div class="coin-grid">
      <base-card class="coin-card" v-for="coin in coins" :key="coin.id">
        <CoinData :coin-id="coin.id" />
      </base-card>
    </div>
    <el-pagination
      v-if="totalPages"
      default-current-page="1"
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
const currentPage = ref<number>(1);
const perPage = ref<number>(24);
const totalCount = ref<number>(0);

const totalPages = computed(() => totalCount.value / perPage.value);

const setCoins = async () => {
  try {
    coins.value = await fetchCoins({ perPage: perPage.value, page: currentPage.value });
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  const allIds = await fetchAllCoinsIds();
  totalCount.value = allIds?.length || 0;
  await setCoins();
});

watch(currentPage, setCoins);

const changePage = (page: number) => {
  currentPage.value = page;
};
</script>

<style lang="scss" scoped>
.coin-dashboard {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
}
.coin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 1.6rem;
  align-items: start;
}

.coin-card {
  min-height: 14.1rem;
}
</style>
