// Replace characters that are not a digit, minus or dot with an empty string
export const convertCurrencyToNumber = (amount: string): number => parseFloat(amount.replace(/[^-0-9.]/g, ''));
