<template>
  <section class="coin-dashboard">
    <div class="coin-grid">
      <el-switch v-model="showOnlyFavs" />
      <base-card class="coin-card" v-for="coin in shownCoins" :key="coin.id">
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
  ref, onMounted, watchEffect, computed,
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

const totalPages = computed(() => totalCount.value / perPage.value);
const coinsWithFav = ref([...coins.value]);
coinsWithFav.value = coins.value.map((coin: Coin) => {
  let favorite = false;
  if (state.favoriteCoins.includes(coin.id)) {
    console.log(coin.id);
    favorite = true;
  }
  return { ...coin, favorite };
});

const onlyFavs = computed(() => coins.value.filter((coin: CoinWithFav) => !!coin.favorite));
const shownCoins = computed(() => showOnlyFavs.value ? onlyFavs.value : coinsWithFav.value);

const changePage = (page: number) => {
  currentPage.value = page;
};

const setCoins = async () => {
  try {
    await fetchLatestCoins({
      perPage: perPage.value,
      vsCurrency: state.currency,
      page: currentPage.value,
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
