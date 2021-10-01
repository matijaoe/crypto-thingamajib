<template>
  <p class="date">
    Price on
    <span class="date-value">{{ formattedDate }}</span>
  </p>
</template>

<script lang="ts" setup>
import { computed, defineProps, toRefs } from 'vue';
import {
  formatDate,
} from '../utils/dates';

const props = defineProps<{
  date: Date | string
}>();
const { date } = toRefs(props);

const formattedDate = computed(() => formatDate(date.value, 'MMMM do, yyyy'));
</script>

<style lang="scss" scoped>
.date {
  font-style: italic;
}
.date-value {
  font-weight: bold;
}
</style>
