import { createContext, useContext } from 'react';

export const FormLineItemsContext = createContext<unknown>(null);
export const useFormLineItemsContext = () => useContext(FormLineItemsContext);
