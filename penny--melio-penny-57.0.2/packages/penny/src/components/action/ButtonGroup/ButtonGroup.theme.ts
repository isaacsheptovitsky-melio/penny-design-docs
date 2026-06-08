import { type SystemStyleObject } from '@chakra-ui/react';

import type { ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import { type ButtonGroupProps } from './ButtonGroup';

export const buttonGroupTheme: ComponentSingleStyleConfig<ButtonGroupProps> = {
  baseStyle: () => ({
    display: 'inline-flex',
    isolation: 'isolate',
    '> *:first-of-type:not(:last-of-type)': {
      borderEndRadius: 'global.none',
    },
    '> *:not(:first-of-type):not(:last-of-type)': {
      borderRadius: 'global.none',
    },
    '> *:not(:first-of-type):last-of-type': {
      borderStartRadius: 'global.none',
    },
    '> *:not([data-loading="true"]):not([disabled]):not([aria-disabled="true"]):hover': {
      zIndex: 1,
    },
    '> *:not([data-loading="true"]):not([disabled]):not([aria-disabled="true"]):focus-visible': {
      zIndex: 1,
    },
    '> *:not(:first-of-type)': {
      marginInlineStart: '-1px',
      ...applyToSelectorInAllStates({ borderLeftWidth: '1px' }),
    },
    '> *:not(:last-of-type)': applyToSelectorInAllStates({ borderRightWidth: '1px' }),
  }),
};

function applyToSelectorInAllStates(props: SystemStyleObject) {
  return {
    ...props,
    '&:hover': props,
    '&:active': props,
    '&[data-loading="true"]': props,
    '&[disabled]': props,
  };
}
