<template>
  <header class="date__header">
    <div class="v-align">
      <base-icon class="icon" name="refresh" @click="refreshCoinData"></base-icon>
      <CurrencySelect />
    </div>
    <DateData :date="date" />
    <!-- <DatePicker /> -->
  </header>
</template>

<script lang="ts" setup>
import useDatePicker from '@/composables/useDatePicker';
// import DatePicker from '@/components/DatePicker.vue';
import DateData from '@/components/DateData.vue';
import CurrencySelect from '@/components/CurrencySelect.vue';
// import useLatestCoinData from '@/composables/useLatestCoinData';

// const { fetchLatestCoins } = useLatestCoinData();

const { date } = useDatePicker();

const refreshCoinData = () => {
  console.log('refresh');
  // TODO: somehow get page and perpage data
  // fetchLatestCoins();
};

</script>

<style lang="scss" scoped>
.date__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6.4rem;
  margin-bottom: 2.4rem;
}

.icon {
  cursor: pointer;
}

.v-align {
  display: flex;
  align-items: center;
  gap: 1.6rem;
}
</style>
