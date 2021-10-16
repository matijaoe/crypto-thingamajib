<template>
  <div class ref="card" :class="['flip-card', { backside: isBackSide }]">
    <div class="flip-card-inner">
      <div class="flip-card-front" @click="flipTo(Sides.BACK)" ref="front">
        <slot />
      </div>
      <div class="flip-card-back" @click="flipTo(Sides.FRONT)" ref="back">
        <slot name="back"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

// eslint-disable-next-line no-shadow
enum Sides {
  FRONT,
  BACK,
}

const currentSide = ref<Sides>(Sides.FRONT);
const card = ref<HTMLElement>();

const flipTo = (side: Sides): void => {
  currentSide.value = side;
};

const isBackSide = computed(() => currentSide.value === Sides.BACK);
</script>

<style lang="scss" scoped>
.flip-card {
  position: relative;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
  width: auto;
  height: 150px;
}

.flip-card-inner {
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.65s;
  transform-style: preserve-3d;
  border: 2px solid var(--border-color);
  background: var(--white);
  border-radius: var(--border-radius);
  box-shadow: 4px 4px 1.2rem var(--shadow-color);
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card.backside .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  border-radius: var(--border-radius);
  padding: 1.6rem;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;

  &:hover {
    border-color: var(--primary-100);
    box-shadow: 0 0 2rem 0 var(--primary-100);
  }
}

.flip-card-back {
  background: white;
  transform: rotateY(180deg);
}
</style>
