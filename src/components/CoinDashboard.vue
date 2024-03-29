<template>
  <section class="coin-dashboard">
    <CoinDashboardHeader />
    <CoinFavoritesSwitch
      :has-favs="!!state.favoriteCoins.length"
      :show-favs="showOnlyFavs"
      @toggle-favs="showOnlyFavs = !showOnlyFavs"
    />
    <div class="coin-grid">
      <base-card
        class="coin-card"
        v-for="coin in coinsWithFav"
        :key="coin.id"
        :class="{ 'is-fav': coin.favorite }"
        @click.right="toggleFavorite(coin)"
        oncontextmenu="return false"
      >
        <CoinData :coin="coin" front />
        <template #back>
          <CoinData :coin="coin" back />
        </template>
      </base-card>
    </div>
    <CoinDasboardFooter :last-updated="lastUpdated" />
  </section>
</template>

<script lang="ts" setup>
import {
  ref, onMounted, watchEffect, watch, computed,
} from 'vue';
import { useStore } from 'vuex';
import { ElNotification } from 'element-plus';
import CoinData from '@/components/CoinData.vue';
import CoinDashboardHeader from '@/components/CoinDashboardHeader.vue';
import CoinDasboardFooter from '@/components/CoinDasboardFooter.vue';
import CoinFavoritesSwitch from '@/components/CoinFavoritesSwitch.vue';
import { fetchAllCoinsIds } from '@/api/cryptoApi';
import { Coin, CoinWithFav } from '@/models/coins';
import { SimpleCoinIds } from '@/models/simple-coins';
import useLatestCoinData from '@/composables/useLatestCoinData';
import useHomepagePagination from '@/composables/useHomepagePagination';

const { state, dispatch } = useStore();
const { coins, fetchLatestCoins } = useLatestCoinData();
const {
  currentPage, perPage, setTotalCount, setPage,
} = useHomepagePagination();

const showOnlyFavs = ref<boolean>(false);
const lastUpdated = ref<string | null>(null);
const allIds = ref<SimpleCoinIds[]>([]);

onMounted(async () => {
  allIds.value = await fetchAllCoinsIds();
  setTotalCount(allIds.value?.length || 0);
});

watch(state.favoriteCoins, (favs) => {
  if (!favs.length) {
    showOnlyFavs.value = false;
  }
});

watch(coins, () => {
  if (coins.value && coins.value.length) {
    const firstCoin = coins.value[0];
    lastUpdated.value = firstCoin.last_updated;
  }
});

watch(showOnlyFavs, (onlyFavs) => {
  if (onlyFavs) {
    setPage(1);
  }
});

// TODO: recalculate totalCount when on favorites
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

watchEffect(setCoins);

const coinsWithFav = computed(() =>
  coins.value.map((coin: Coin) => ({ ...coin, favorite: state.favoriteCoins.includes(coin.id) })));

const showFavoriteToggleNotification = (coin: CoinWithFav, added: boolean) => {
  const title = added
    ? `${coin.symbol.toUpperCase()} added to favorites!`
    : `${coin.symbol.toUpperCase()} removed from favorites`;
  const message = `Right click to ${added ? 'remove it' : 'add it again'}`;
  ElNotification({
    title,
    message,
    duration: 2000,
    position: 'top-right',
  });
};

const toggleFavorite = (coin: CoinWithFav) => {
  // eslint-disable-next-line no-param-reassign
  coin.favorite = !coin.favorite;
  dispatch('toggleFavorites', coin.id);
  showFavoriteToggleNotification(coin, coin.favorite);
};
</script>

<style lang="scss" scoped>
.coin-dashboard {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}
.coin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 1.6rem;
  align-items: start;
}
</style>
