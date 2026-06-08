export const getStartIndex = (pageSize: number, currentPage: number, totalItems: number): number => {
  const totalPages = getTotalPages(totalItems, pageSize);
  const pageForCalculation = Math.min(currentPage, totalPages);
  return Math.max(1, 1 + pageSize * (pageForCalculation - 1));
};

export const getEndIndex = (pageSize: number, currentPage: number, totalItems: number): number => {
  const pageForCalculation = Math.max(currentPage, 1);
  return Math.min(pageSize * pageForCalculation, totalItems);
};

export const getTotalPages = (totalItems: number, pageSize: number): number => Math.ceil(totalItems / pageSize);

export const getPreviousEnabled = (currentPage: number): boolean => currentPage > 1;

export const getNextEnabled = (currentPage: number, totalItems: number, pageSize: number): boolean => {
  const totalPages = getTotalPages(totalItems, pageSize);
  return currentPage + 1 <= totalPages;
};
