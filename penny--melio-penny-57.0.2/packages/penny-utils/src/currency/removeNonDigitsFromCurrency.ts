import { convertCurrencyToNumber } from './convertCurrencyToNumber';

export const removeNonDigitsFromCurrency = (amount: string): string => {
  const currenyToNumber = convertCurrencyToNumber(amount);

  if (isNaN(currenyToNumber)) {
    throw new Error('Amount is invalid');
  }

  return currenyToNumber.toString();
};
