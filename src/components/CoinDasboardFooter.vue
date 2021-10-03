<template>
  <div>
    <p>Last updated at {{ new Date().toDateString() }}</p>
    <el-pagination
      v-if="totalPages"
      :default-current-page="1"
      background
      layout="prev, pager, next"
      :total="totalPages"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
// TODO: move to composable
// Last updated at ... <refresh_icon>
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

const PER_PAGE = 12;

// REFS
// TODO: move to composable
const currentPage = ref<number>(1);
const perPage = ref<number>(PER_PAGE);
const totalCount = ref<number>(0);

const totalPages = computed(() => totalCount.value / perPage.value);

onMounted(async () => {
  const allIds = await fetchAllCoinsIds();
  totalCount.value = allIds?.length || 0;
});

const changePage = (page: number) => {
  currentPage.value = page;
};

</script>
