import { createStylesContext } from '@chakra-ui/react';
import type { RefObject } from 'react';
import { createContext, useContext } from 'react';

import type { Accept, FileRejection } from './Dropzone.types';

export type DropzoneContextValue = {
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
  acceptedFiles: File[];
  rejectedFiles: FileRejection[];
  processFiles: (files: File[]) => void;
  openFilePicker: () => void;
  inputRef: RefObject<HTMLInputElement>;
  accept?: Accept;
  multiple: boolean;
};

type ContextType = DropzoneContextValue | null;

export const DropzoneContext = createContext<ContextType>(null);

export const useDropzoneContext = () => {
  const context = useContext(DropzoneContext);

  if (context === null) {
    throw new Error('Dropzone components must be wrapped in <DropzoneRoot />');
  }

  return context;
};

export const [StylesProvider, useStyles] = createStylesContext('Dropzone');
