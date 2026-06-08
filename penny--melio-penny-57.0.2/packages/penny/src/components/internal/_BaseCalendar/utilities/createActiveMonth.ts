import { getMonth, getYear } from '@melio/penny-utils';

export const createActiveMonth = (src: Date) => {
  const month = getMonth(src);
  const year = getYear(src);
  // eslint-disable-next-line no-restricted-syntax
  const date = new Date(year, month, 15, 12);

  return { month, year, date };
};
