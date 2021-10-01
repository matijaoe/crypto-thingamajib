import { ref } from 'vue';

const date = ref<Date>(new Date());

export default () => ({
  date,
});
