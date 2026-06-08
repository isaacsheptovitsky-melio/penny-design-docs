import { createContext } from 'react';

export type TableContextData = {
  headerVariant?: 'light' | 'dark';
  focusedCellId?: string;
};

export const TableContext = createContext<TableContextData>({} as TableContextData);
