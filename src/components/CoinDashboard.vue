<template>
  <section class="coin-dashboard">
    <el-switch v-model="showOnlyFavs" />
    <div class="coin-grid">
      <base-card v-for="coin in coinsWithFav" :key="coin.id" :class="{ 'is-fav': coin.favorite }">
        <CoinData :coin="coin" />
      </base-card>
    </div>
    <el-pagination
      v-if="totalPages"
      :default-current-page="1"
      background
      layout="prev, pager, next"
      :total="totalPages"
      @current-change="changePage"
    ></el-pagination>
  </section>
</template>

<script lang="ts" setup>
import {
  ref, onMounted, watchEffect, watch, computed,
} from 'vue';
import { useStore } from 'vuex';
import CoinData from '@/components/CoinData.vue';
import { fetchAllCoinsIds } from '@/api/cryptoApi';
import { Coin } from '@/models/coins';
import useLatestCoinData from '@/composables/useLatestCoinData';

const { coins, fetchLatestCoins } = useLatestCoinData();

interface CoinWithFav extends Coin {
  favorite?: boolean
}
const { state } = useStore();

const PER_PAGE = 9;

const currentPage = ref<number>(1);
const perPage = ref<number>(PER_PAGE);
const totalCount = ref<number>(0);
const showOnlyFavs = ref<boolean>(false);
const coinsWithFav = ref<CoinWithFav[]>([...coins.value]);

const totalPages = computed(() => totalCount.value / perPage.value);

// Create coins but with favorites
watch(coins, () => {
  coinsWithFav.value = coins.value.map((coin: Coin) =>
    ({ ...coin, favorite: state.favoriteCoins.includes(coin.id) }));
});

const changePage = (page: number) => {
  currentPage.value = page;
};

const setCoins = async () => {
  try {
    await fetchLatestCoins({
      perPage: perPage.value,
      vsCurrency: state.currency,
      page: currentPage.value,
      ids: showOnlyFavs.value ? state.favoriteCoins.toString() : '',
    });
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  const allIds = await fetchAllCoinsIds();
  totalCount.value = allIds?.length || 0;
});

watchEffect(setCoins);

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
