import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';
import { type InternalCSSObject } from '@/theme/types';

import { type ColTextAlign } from '../Table.types';

const clickableStyles: InternalCSSObject = {
  cursor: 'pointer',
  transition: 'background-color, outline-color 0.2s ease-in-out',
  outlineColor: 'transparent',

  _hover: {
    backgroundColor: 'semantic.surface.primary.hover',
  },

  _focusVisible: {
    // A trick to avoid having the outline being cropped by the card container
    // https://stackoverflow.com/a/35201368
    outlineOffset: '-2px',
    outlineColor: 'semantic.focus.primary',
    transition: 'outline-color 0.2s',
  },

  _active: {
    backgroundColor: 'semantic.surface.primary.pressed',
  },
};

const unclickableStyles: InternalCSSObject = {
  _hover: {
    backgroundColor: 'initial',
  },

  _active: {
    backgroundColor: 'initial',
  },

  _disabled: {
    cursor: 'not-allowed',
  },

  _readOnly: {
    cursor: 'default',
  },
};

export const getSharedCellStyles = (isClickable: boolean, textAlign?: ColTextAlign): InternalCSSObject => ({
  display: 'flex',
  justifyContent: textAlign,
  width: '100%',
  height: '100%',
  padding: 's',
  textAlign,
  ...(isClickable ? clickableStyles : unclickableStyles),
});

export const tableCellTheme: ComponentSingleStyleConfig<{
  hasChildren: boolean;
  isClickable: boolean;
  textAlign?: ColTextAlign;
  isLoading?: boolean;
}> = {
  baseStyle: ({ hasChildren, isClickable, textAlign }) => ({
    ...getSharedCellStyles(isClickable, textAlign),
    backgroundColor: 'initial',
    alignItems: 'center',
    textStyle: 'body3',
    textAlign,
    color: hasChildren ? 'semantic.text.primary' : 'semantic.text.secondary',
  }),
};
