export const createDate = (str?: string) => {
  if (str && !/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    throw new Error('Use YYYY-MM-DD');
  }
  if (str) {
    // eslint-disable-next-line no-restricted-syntax
    return new Date(`${str}T12:00:00.000Z`);
  }
  // eslint-disable-next-line no-restricted-syntax
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  return date;
};
