import { createContext, useContext } from 'react';

export type FormControlContextData = {
  maxChars?: number;
  isInvalid?: boolean;
};

export const FormControlContext = createContext<FormControlContextData>({});
export const useFormControlContext = () => useContext(FormControlContext);
