<template>
  <p class="date">
    <span class="date-value">{{ formattedDate }}</span>
    <base-icon name="calendar" size="md"></base-icon>
  </p>
</template>

<script lang="ts" setup>
import { computed, defineProps, toRefs } from 'vue';
import { formatDate } from '../utils/dates';

const props = defineProps<{
  date: Date
}>();
const { date } = toRefs(props);

const formattedDate = computed(() => formatDate(date.value, 'MMMM do, yyyy'));
</script>

<style lang="scss" scoped>
.date {
  font-style: italic;
  display: flex;
  align-items: center;
  gap: 1.6rem;
}
.date-value {
  font-weight: bold;
}
</style>
