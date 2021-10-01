<template>
  <el-date-picker
    v-model="date"
    format="DD.MM.YYYY."
    type="date"
    placeholder="Pick a day"
    :disabled-date="datePicker.disabledDate"
    :shortcuts="datePicker.shortcuts"
    style="margin-left:auto"
  ></el-date-picker>
</template>

<script lang="ts" setup>
import {
  ref, reactive, watch, defineEmits, onMounted,
} from 'vue';
import { getDateDaysAgo, getDateYearsAgo } from '../utils/dates';

const emits = defineEmits(['dateChange']);

const date = ref<Date>(new Date());
const datePicker = reactive({
  disabledDate: (time: Date) => time.getTime() > Date.now(),
  shortcuts: [
    {
      text: 'Today',
      value: new Date(),
    },
    {
      text: 'Yesterday',
      value: () => getDateDaysAgo(1),
    },
    {
      text: 'A week ago',
      value: () => getDateDaysAgo(7),
    },
    {
      text: 'A year ago',
      value: () => getDateYearsAgo(1),
    },
    {
      text: 'Three years ago',
      value: () => getDateYearsAgo(3),
    },
  ],
});

onMounted(() => emits('dateChange', date.value));

watch(date, (value) => emits('dateChange', value));

</script>

<style lang="scss" scoped>
</style>
