import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import { type FileInputProps } from './FileInput';

export const fileInputTheme: ComponentSingleStyleConfig<FileInputProps> = {
  baseStyle: {
    opacity: 0,
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    cursor: 'pointer',
    appearance: 'none',
    _disabled: {
      cursor: 'not-allowed',
    },
    _readOnly: {
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    '&[aria-hidden="true"]': {
      cursor: 'default',
    },
  },
};
