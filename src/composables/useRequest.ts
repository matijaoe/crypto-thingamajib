import { readonly, ref } from 'vue';
import axios from 'axios';

export default () => {
  const loading = ref(false);
  const payload = ref(null);

  const makeRequest = async (url: string, params = {}) => {
    loading.value = true;
    const { data } = await axios.get(url, {
      params,
    });
    payload.value = data;
  };

  return {
    payload: readonly(payload),
    loading: readonly(loading),
    makeRequest,
  };
};
