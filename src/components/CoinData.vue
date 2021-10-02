<template>
  <!-- eslint-disable max-len -->
  <div v-if="coin && coin.id" class="coin">
    <div class="coin__data">
      <p class="coin__rank">#{{ coin.market_cap_rank }}</p>
      <img class="coin__thumb" :src="coin.image" />
      <h2 class="coin__name">{{ coin.name }}</h2>
      <span class="coin__ticker">{{ coin.symbol }}</span>
    </div>
    <div class="coin__price" v-if="coin.current_price">
      <base-icon :name="currencyIcon" size="lg"></base-icon>
      <p class="coin__price--amount">{{ formatPrice(coin.current_price, state.currency) }}</p>
      <el-tooltip effect="light" content="24hr change" placement="top">
        <p class="coin__percentage" :class="[changeIndicator]">
          <base-icon :name="changeIcon" size="sm"></base-icon>
          {{ formatPercentage(Math.abs(coin.price_change_percentage_24h)) }}%
        </p>
      </el-tooltip>
    </div>
    <p v-else class="coin__price--error">
      No price
      <base-icon name="alert-octagon" size="md"></base-icon>
    </p>
  </div>
  <div v-else>
    <p>No coin found</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
import { formatPrice, formatPercentage } from '../utils/numbers';
import { Coin } from '@/models/coins';
import { getCurrencyIcon } from '@/utils/currency';

const props = defineProps<{
  coin: Coin;
}>();

const { state } = useStore();

const currencyIcon = computed(() => getCurrencyIcon(state.currency));

const priceHasGrown = computed(() => props.coin.price_change_percentage_24h > 0);

const changeIcon = priceHasGrown.value ? 'trending-up' : 'trending-down';
const changeIndicator = priceHasGrown.value ? 'up' : 'down';

</script>

<style lang="scss" scope>
.coin {
  &__data {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 0.8rem;
  }

  &__name {
    font-size: 2rem;
    font-weight: bold;
    line-height: 1;
    margin: 0.8rem 0;
  }

  &__ticker {
    position: absolute;
    top: -1rem;
    right: -1rem;
    font-weight: bold;
    text-transform: uppercase;
    transform: rotate(12deg);
    padding: 0.2rem 0.6rem;
    border-radius: var(--border-radius);
    background: var(--gray-200);
    color: var(--gray-600);
    font-size: 1.2rem;
  }

  &__rank {
    position: absolute;
    top: 0;
    margin: 0;
    right: 0;
    bottom: 0;
    font-size: 10rem;
    opacity: 0.2;
    color: var(--primary-200);
    user-select: none;
  }

  &__thumb {
    width: 24px;
    height: 24px;
  }

  &__price {
    font-size: 3rem;
    display: flex;
    align-items: center;
    margin: 0;

    &--amount {
      margin: 0 0.4rem;
    }

    &--error {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
  }

  &__percentage {
    font-size: 1.6rem;
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: bold;

    &.up {
      color: var(--success);
    }

    &.down {
      color: var(--error);
    }
  }
}

.card {
  &:hover {
    .coin__ticker {
      background: var(--primary-100);
      color: var(--primary-700);
    }
  }
}
</style>
