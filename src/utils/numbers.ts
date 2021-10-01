import numeral from 'numeral';

type formatPriceFn = (price: number) => string;
// eslint-disable-next-line import/prefer-default-export
export const formatPrice: formatPriceFn = (price: number) => numeral(price).format('0,0.00');
