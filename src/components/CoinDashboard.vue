<template>
  <section class="coin-dashboard">
    <el-switch v-model="showOnlyFavs" />
    <div class="coin-grid">
      <base-card
        class="coin-card"
        v-for="coin in coinsWithFav"
        :key="coin.id"
        :class="{ 'is-fav': coin.favorite }"
        @click.right="toggleFavorite(coin)"
        oncontextmenu="return false"
      >
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
import { ElNotification } from 'element-plus';
import CoinData from '@/components/CoinData.vue';
import { fetchAllCoinsIds } from '@/api/cryptoApi';
import { Coin } from '@/models/coins';
import useLatestCoinData from '@/composables/useLatestCoinData';

const { coins, fetchLatestCoins } = useLatestCoinData();

interface CoinWithFav extends Coin {
  favorite?: boolean
}
const { state, dispatch } = useStore();

const PER_PAGE = 9;

// REFS
const currentPage = ref<number>(1);
const perPage = ref<number>(PER_PAGE);
const totalCount = ref<number>(0);
const showOnlyFavs = ref<boolean>(false);
const coinsWithFav = ref<CoinWithFav[]>([...coins.value]);

const totalPages = computed(() => totalCount.value / perPage.value);

// Create coins but with favorites
watchEffect(() => {
  coinsWithFav.value = coins.value.map((coin: Coin) =>
    ({ ...coin, favorite: state.favoriteCoins.includes(coin.id) }));
});

const showFavoriteToggleNotification = (coin: CoinWithFav, added: boolean) => {
  const title = added ? `${coin.name} added to favorites!` : `${coin.name} removed from favorites`;
  const message = `Right click to ${added ? 'remove it' : 'add it again'}`;
  ElNotification({
    title,
    message,
    position: 'top-left',
  });
};

const toggleFavorite = (coin: CoinWithFav) => {
  // eslint-disable-next-line no-param-reassign
  coin.favorite = !coin.favorite;
  dispatch('toggleFavorites', coin.id);
  showFavoriteToggleNotification(coin, coin.favorite);
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
