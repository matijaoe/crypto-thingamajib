<template>
  <header class="date__header">
    <DateData :date="date" />
    <DatePicker />
  </header>
</template>

<script lang="ts" setup>
import useDatePicker from '@/composables/useDatePicker';
import DatePicker from '@/components/DatePicker.vue';
import DateData from '@/components/DateData.vue';

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
