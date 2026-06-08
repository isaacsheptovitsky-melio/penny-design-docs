import { applyInteractiveStates } from '@/utils/componentStyle.utils';

import { type TextStyleKey } from '../foundations/text-styles';
import { type InternalCSSObject } from '../types';

const focusStyles = {
  outlineStyle: 'solid',
  outlineOffset: '2px',
  outlineColor: 'semantic.focus.primary',
  border: 'semantic.input.default',
  borderColor: 'semantic.border.brand',
};

export const input: Record<'field', InternalCSSObject> = {
  field: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    minWidth: 0,
    outline: 0,
    position: 'relative',
    transition: 'outline-color 0.1s ease-in-out',
    color: 'semantic.text.primary',
    paddingX: 'none',
    background: 'semantic.surface.primary.rest',
    textStyle: 'body2',
    border: 'semantic.input.default',
    borderColor: 'semantic.border.interactive.rest',
    borderRadius: 'semantic.input.default',
    paddingLeft: 's',
    paddingRight: 's',

    '&.small': {
      height: '40px',
    },
    '&.large': {
      height: '48px',
    },
    _hover: {
      borderColor: 'semantic.border.interactive.hover',
    },
    _focus: focusStyles,
    _focusWithin: focusStyles,
    _placeholder: {
      color: 'semantic.text.secondary',
    },
    _readOnly: {
      boxShadow: 'none !important' as never,
      cursor: 'auto',
      userSelect: 'all',
      color: 'semantic.text.secondary',
      borderColor: 'semantic.border.interactive.disabled',
      backgroundColor: 'semantic.surface.primary.disabled',
      _focus: {
        borderColor: 'semantic.border.interactive.disabled',
      },
    },
    '&[data-view-mode="true"]': applyInteractiveStates({
      boxShadow: 'none !important' as never,
      cursor: 'auto',
      userSelect: 'all',
      pointerEvents: 'none',
      color: 'semantic.text.primary',
      borderColor: 'transparent',
      paddingLeft: 'none',
      paddingRight: 'none',
      height: 'auto',
      backgroundColor: 'transparent',
      _hover: {
        borderColor: 'transparent',
      },
      _disabled: {
        borderColor: 'transparent',
      },
      '&[data-loading="true"]': {
        borderColor: 'transparent',
      },
    }),
    _disabled: applyInteractiveStates({
      outline: 'none',
      color: 'semantic.text.disabled',
      cursor: 'default',
      backgroundColor: 'semantic.surface.primary.disabled',
      _hover: {
        borderColor: 'semantic.border.interactive.disabled',
      },
      borderColor: 'semantic.border.interactive.disabled',
      _placeholder: {
        color: 'semantic.text.disabled',
      },
      '&[data-loading="true"]': {
        borderColor: 'semantic.border.interactive.disabled',
        backgroundColor: 'semantic.surface.primary.disabled',
      },
      '&[data-view-mode="true"]': {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
      },
    }),
    _invalid: applyInteractiveStates({
      borderColor: 'semantic.border.critical',
      _hover: {
        borderColor: 'semantic.border.critical',
      },
    }),
  },
};

export type FormSize = 'large' | 'small';
export const formTextStyle: TextStyleKey = 'body2';
export const formHeight: Record<FormSize, { height: string }> = {
  large: {
    height: '48px',
  },
  small: {
    height: '40px',
  },
};
