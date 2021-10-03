<template>
  <div class="coin-dashboard-footer">
    <p
      v-if="props.lastUpdated"
      class="last-updated-at"
    >Last updated at {{ formatDate(props.lastUpdated, 'H:mm:ss') }}</p>
    <el-pagination
      v-if="totalPages"
      :total="totalPages"
      :current-page="currentPage"
      :default-current-page="1"
      background
      layout="prev, pager, next"
      @current-change="setPage"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import useHomepagePagination from '@/composables/useHomepagePagination';
import { formatDate } from '@/utils/dates';

const props = defineProps<{
  lastUpdated: string | null
}>();
const {
  totalPages,
  currentPage,
  setPage,
} = useHomepagePagination();

// TODO: check if showing favs, if so, calculate how many total pages

</script>

<style lang="scss" scoped>
.coin-dashboard-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.last-updated-at {
  color: var(--gray-300);
}
.el-pagination {
  margin-left: auto;
}
</style>
