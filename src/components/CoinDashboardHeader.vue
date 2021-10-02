<template>
  <header class="date__header">
    <CurrencySelect />
    <DateData :date="date" />
    <!-- <DatePicker /> -->
  </header>
</template>

<script lang="ts" setup>
import useDatePicker from '@/composables/useDatePicker';
// import DatePicker from '@/components/DatePicker.vue';
import DateData from '@/components/DateData.vue';
import CurrencySelect from '@/components/CurrencySelect.vue';

const { date } = useDatePicker();

</script>

<style lang="scss" scoped>
.date__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6.4rem;
  margin-bottom: 2.4rem;
}
</style>
