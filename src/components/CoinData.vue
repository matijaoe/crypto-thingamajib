<template>
  <!-- eslint-disable max-len -->
  <div v-if="coin && coin.id && front" class="coin">
    <div class="coin__data">
      <p class="coin__rank">#{{ coin.market_cap_rank }}</p>
      <img class="coin__thumb" :src="coin.image" />
      <h2 class="coin__name">{{ coin.name }}</h2>
      <span class="coin__ticker">{{ coin.symbol }}</span>
    </div>
    <div class="coin__price" v-if="coin.current_price">
      <base-icon :name="currencyIcon" size="lg"></base-icon>
      <p class="coin__price--amount">{{ formatPrice(coin.current_price, state.currency, true) }}</p>
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
  <div v-else-if="coin && coin.id && back" class="coin">
    <div class="coin__row">
      <span class="coin__stat--label">Market cap</span>
      <p>
        <base-icon :name="currencyIcon" size="sm"></base-icon>
        {{ formatPrice(coin.market_cap, state.currency, false) }}
      </p>
    </div>
    <div class="coin__row">
      <div class="down">
        <p class="coin__daycandle--value">
          <base-icon :name="currencyIcon" size="sm"></base-icon>
          {{ formatPrice(coin.low_24h, state.currency, true) }}
        </p>
        <span class="coin__daycandle--label">24hr low</span>
      </div>
      <div class="up">
        <p class="coin__daycandle--value">
          <base-icon :name="currencyIcon" size="sm"></base-icon>
          {{ formatPrice(coin.high_24h, state.currency, true) }}
        </p>
        <span class="coin__daycandle--label">24hr high</span>
      </div>
    </div>
  </div>
  <div v-else>
    <p>No data found</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
import { formatPrice, formatPercentage } from '@/utils/numbers';
import { Coin } from '@/models/coins';

const props = defineProps<{
  coin: Coin;
  front?: boolean,
  back?: boolean
}>();

const { state, getters } = useStore();

const currencyIcon = computed(() => getters['currencies/getCurrencyIcon'](state.currency));
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
    right: 2rem;
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
    z-index: 20;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__stat {
    &--label {
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.8em;
    }
  }

  &__daycandle {
    &--value {
      margin: 0;
    }

    &--label {
      margin: 0;
      text-transform: uppercase;
      font-size: 0.7em;
      font-weight: bold;
    }
  }

  .up {
    color: var(--success);
  }

  .down {
    color: var(--error);
  }
}

.flip-card.backside {
  .coin__ticker {
    display: none;
  }
}

.flip-card {
  &.is-fav {
    .flip-card-inner {
      border-color: var(--primary-200);
      box-shadow: 0 0 2rem 0 var(--primary-100);
      background: var(--primary-50);
      color: var(--primary-700);

      &:hover {
        border-color: var(--primary-200);
        background: var(--primary-100);
        color: var(--primary-800);
      }
    }
  }

  &:hover,
  &.is-fav {
    .coin__ticker {
      background: var(--primary-100);
      color: var(--primary-700);
    }
  }
}
</style>
