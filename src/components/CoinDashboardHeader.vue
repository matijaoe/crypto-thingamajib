<template>
  <header class="dashboard__header">
    <CurrencySelect />
    <DateData :date="date" />
  </header>
</template>

<script lang="ts" setup>
import useDatePicker from '@/composables/useDatePicker';
import DateData from '@/components/DateData.vue';
import CurrencySelect from '@/components/CurrencySelect.vue';

const { date } = useDatePicker();

</script>

<style lang="scss" scoped>
.dashboard__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 700px) {
    flex-direction: column-reverse;
    align-content: flex-start;
    justify-content: flex-start;
  }
}

.icon {
  cursor: pointer;
}

.v-align {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
</style>
