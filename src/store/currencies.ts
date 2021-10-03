interface CurrenciesState {
  supportedCurrencies: { [key: string]: string };
}

export default {
  namespaced: true,
  state: (): CurrenciesState => ({
    supportedCurrencies: {
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
      sar: 'riyal',
      sek: 'krone-swedish',
      sgd: 'dollar-singapore',
      thb: 'bath',
      try: 'lira',
      usd: 'dollar',
      xrp: 'ripple',
    },
  }),
  mutations: {},
  actions: {},
  getters: {
    getCurrencyCodes(state: CurrenciesState): string[] {
      return Object.keys(state.supportedCurrencies);
    },
    getCurrencyIcon: (state: CurrenciesState): ((currencyCode: string) => string | null) => (
      currencyCode: string,
    ) =>
      currencyCode in state.supportedCurrencies
        ? `currency-${state.supportedCurrencies[currencyCode]}`
        : null,
  },
};
