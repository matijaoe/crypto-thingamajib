const currencyIconMap: { [key: string]: string } = {
  aud: 'dollar-australian',
  bdt: 'taka',
  brl: 'real',
  btc: 'bitcoin',
  cad: 'dollar-canadian',
  chf: 'frank',
  cny: 'renminbi',
  czk: 'krone-czech',
  eth: 'ethereum',
  eur: 'euro',
  gbp: 'pound',
  huf: 'forint',
  ils: 'shekel',
  inr: 'rupee',
  krw: 'won',
  ltc: 'litecoin',
  ngn: 'naira',
  nkk: 'krone-danish',
  pln: 'zloty',
  rub: 'rubel',
  sar: 'rijal',
  sek: 'krone-swedish',
  sgd: 'dollar-singapore',
  thb: 'bath',
  try: 'lira',
  usd: 'dollar',
  xrp: 'ripple',
};

type CurrencyIconFn = (code: string) => string | null;

export const getSupportedCurrencies = () => Object.keys(currencyIconMap);

// eslint-disable-next-line import/prefer-default-export
export const getCurrencyIcon: CurrencyIconFn = (currencyCode: string) => {
  if (currencyCode in currencyIconMap) {
    return `currency-${currencyIconMap[currencyCode]}`;
  }
  return null;
};
