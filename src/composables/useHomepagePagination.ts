import { ref, computed, readonly } from 'vue';

const PER_PAGE = 12;

const currentPage = ref<number>(1);
const perPage = ref<number>(PER_PAGE);
const totalCount = ref<number>(0);

export default () => {
  const totalPages = computed(() => totalCount.value / perPage.value);

  const setPage = (page: number) => {
    currentPage.value = page;
  };

  const setTotalCount = (count: number) => {
    totalCount.value = count;
  };

  return {
    totalPages,
    currentPage,
    perPage,
    totalCount: readonly(totalCount),
    setPage,
    setTotalCount,
  };
};
