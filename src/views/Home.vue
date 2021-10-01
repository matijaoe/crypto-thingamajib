<template>
  <div>
    <DatePanel />
    <CoinDashboard />
  </div>
</template>

<script lang="ts" setup>

import CoinDashboard from '@/components/CoinDashboard.vue';
import DatePanel from '@/components/DatePanel.vue';
import useDatePicker from '@/composables/useDatePicker';

</script>
