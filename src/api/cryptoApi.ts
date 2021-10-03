import useRequest from '@/composables/useRequest';
import { CoinHistorical, Coin } from '@/models/coins';
import { SimpleSingleCoin } from '@/models/simple-coins';

const baseUrl = 'https://api.coingecko.com/api/v3';

export const fetchCoins = async ({
  ids = '',
  perPage = 10,
  vsCurrency,
  orderBy = 'market_cap_desc',
  page = 1,
  sparkline = false,
  priceChangePercentage = '24h',
}: SimpleSingleCoin): Promise<Coin[] | []> => {
  const { payload, makeRequest } = useRequest();
  const url = `${baseUrl}/coins/markets`;
  await makeRequest(url, {
    ids,
    vs_currency: vsCurrency,
    order: orderBy,
    per_page: perPage,
    page,
    sparkline,
    price_change_percentage: priceChangePercentage,
  });
  return payload.value || [];
};

export const fetchCoinHistoryData = async (
  coinId: string,
  date: string,
  { localization = false } = {},
): Promise<CoinHistorical | null> => {
  const { payload, makeRequest } = useRequest();
  const url = `${baseUrl}/coins/${coinId}/history`;
  await makeRequest(url, {
    date,
    localization,
  });
  return payload.value;
};

export const fetchAllCoinsIds = async (): Promise<Coin[] | []> => {
  const { payload, makeRequest } = useRequest();
  const url = `${baseUrl}/coins/list`;
  await makeRequest(url);
  return payload.value || [];
};
