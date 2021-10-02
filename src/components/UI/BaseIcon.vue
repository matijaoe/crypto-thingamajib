<template>
  <i :class="[iconPack, iconName, size]"></i>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';

const props = defineProps<{
  name: string,
  size?: string
}>();

const iconPack = 'ti';

const iconName = computed(() => `${iconPack}-${props.name}`);
</script>

<style lang="scss" scoped>
.ti {
  font-size: 2.4rem;

  &.sm {
    font-size: 1.6rem;
  }

  &.md {
    font-size: 2.4rem;
  }

  &.lg {
    font-size: 3.2rem;
  }
}
</style>
