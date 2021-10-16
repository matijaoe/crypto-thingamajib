/* eslint-disable implicit-arrow-linebreak */
import numeral from 'numeral';

type formatPriceFn = (price: number, currency?: string, showDecimals?: boolean) => string;
type formatPercentageFn = (price: number) => string;

export const formatPrice: any = (price: number, currency: string, showDecimals: boolean) => {
  if (!showDecimals) {
    return numeral(price).format('0,0');
  }
  switch (currency) {
    case 'btc':
      return numeral(price).format('0,0.00000000');
    case 'eth':
      return numeral(price).format('0,0.000000');
    default:
      return numeral(price).format('0,0.00');
  }
};

export const formatPercentage: formatPercentageFn = (price: number) =>
  numeral(price).format('0,0.00');
