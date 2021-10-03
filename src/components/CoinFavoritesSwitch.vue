<template>
  <el-tooltip effect="light" content="Right click to toggle favorites" placement="right">
    <div class="fav-switch">
      <span class="fav-switch__label" :class="{ 'active': !showFavs }">All</span>
      <el-switch :value="showFavs" @change="emits('toggleFavs')" :disabled="!hasFavs" />
      <span class="fav-switch__label" :class="{ 'active': showFavs }">Favorites</span>
    </div>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

defineProps<{
  showFavs: boolean,
  hasFavs: boolean
}>();

const emits = defineEmits(['toggleFavs']);
</script>

<style lang="scss" scoped>
.fav-switch {
  display: flex;
  align-items: center;
  gap: 1.8rem;
  width: max-content;

  &__label {
    color: var(--gray-400);

    &.active {
      color: var(--primary-500);
      font-weight: bold;
    }
  }
}
</style>
