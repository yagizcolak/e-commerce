import { Currency } from '../context/CurrencyContext';

const exchangeRates: { [key in Currency]: number } = {
  USD: 1,
  EUR: 0.9,
  TRY: 30,
};

export const convertPrice = (priceInUSD: number, currency: Currency): number => {
  const rate = exchangeRates[currency];
  return priceInUSD * rate;
};