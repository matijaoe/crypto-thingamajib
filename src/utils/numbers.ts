/* eslint-disable implicit-arrow-linebreak */
import numeral from 'numeral';

type formatPriceFn = (price: number, currency?: string) => string;
type formatPercentageFn = (price: number) => string;

export const formatPrice: formatPriceFn = (price: number, currency?: string) => {
  switch (currency) {
    case 'btc':
      return numeral(price).format('0,0.0000000');
    case 'eth':
      return numeral(price).format('0,0.00000');
    default:
      return numeral(price).format('0,0.00');
  }
};

export const formatPercentage: formatPercentageFn = (price: number) =>
  numeral(price).format('0,0.00');
