export interface SimpleCoinPrice {
  usd?: number;
  usd_24h_change?: number;
  eur?: number;
  eur_24h_change?: number;
  btc?: number;
  btc_24h_change?: number;
}

export interface SimpleSingleCoin {
  ids?: string;
  vsCurrency: string;
  perPage?: number;
  orderBy?: string;
  page?: number;
  sparkline?: boolean;
  priceChangePercentage?: string;
}

export interface SimpleCoinIds {
  id: string;
  symbol: string;
  name: string;
}
