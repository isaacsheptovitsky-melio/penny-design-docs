import { type Strategy } from '@floating-ui/react';

import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { themeSpaces } from '@/theme/foundations/spaces';
import { type InternalCSSObject } from '@/theme/types';

const sharedOptionStyles: InternalCSSObject = {
  width: '100%',
  display: 'flex',
  gap: 's',
  alignItems: 'center',
  padding: 's',
  cursor: 'pointer',
  transition: 'background-color 0.1s ease-in-out',
  textStyle: 'body3',
  outline: 'none',
};

const sharedIconStyles: InternalCSSObject = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&[data-view-mode="true"]': { display: 'none' },
};

const getValueRightElementWidth = (valueRightElementWidth: number) =>
  valueRightElementWidth ? `calc(${themeSpaces.xs} + ${valueRightElementWidth}px)` : '0px';

export const baseSelectTheme: ComponentMultiStyleConfig<
  | 'container'
  | 'placeholder'
  | 'triggerInput'
  | 'trigger'
  | 'toggleButtonRightElement'
  | 'triggerOverlay'
  | 'valueRightElement'
  | 'triggerLeftIcon'
  | 'triggerRightIcon'
  | 'dropdownMenu'
  | 'dropdownMenuContent'
  | 'optionsContainer'
  | 'sectionLabel'
  | 'option'
  | 'checkedIcon'
  | 'creatableOption'
  | 'emptyState'
  | 'loading',
  {
    isOpen?: boolean;
    shouldShowCreatableOption?: boolean;
    x?: number | null;
    y?: number | null;
    strategy?: Strategy;
    hasLeftElement?: boolean;
    isViewMode?: boolean;
    clickableEmptyState?: boolean;
    valueRightElementWidth?: number;
    placeholderValue?: string;
  }
> = {
  parts: [
    'container',
    'placeholder',
    'triggerInput',
    'trigger',
    'toggleButtonRightElement',
    'triggerOverlay',
    'valueRightElement',
    'triggerLeftIcon',
    'triggerRightIcon',
    'dropdownMenu',
    'dropdownMenuContent',
    'optionsContainer',
    'sectionLabel',
    'option',
    'checkedIcon',
    'creatableOption',
    'emptyState',
    'loading',
  ],
  baseStyle: ({
    isOpen,
    shouldShowCreatableOption,
    strategy,
    x,
    y,
    clickableEmptyState,
    hasLeftElement,
    isViewMode,
    valueRightElementWidth = 0,
    placeholderValue,
  }) => ({
    container: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    triggerInput: {
      position: 'absolute',
      inset: '0',
      opacity: '0',
      cursor: 'pointer',
    },
    trigger: {
      textOverflow: 'ellipsis',
      position: 'relative',
      textAlign: 'start',
      textStyle: 'body2',
      display: 'flex',
      alignItems: 'center',

      // Overrides the input's padding-right.
      paddingRight: (isViewMode
        ? // Using `!important` here to override the input's view-mode selector.
          `${getValueRightElementWidth(valueRightElementWidth)} !important`
        : `calc(${themeSpaces.xxl} + ${getValueRightElementWidth(valueRightElementWidth)})`) as never,

      _placeholder: {
        color: 'semantic.text.secondary',
        _readOnly: { color: 'semantic.text.secondary' },
      },

      _disabled: {
        color: 'semantic.text.disabled',
        cursor: 'default',
        borderColor: 'semantic.border.static',
        backgroundColor: isViewMode ? 'transparent' : 'semantic.surface.primary.disabled',
        _hover: { borderColor: 'semantic.border.static' },
      },

      '&[data-ui-only="true"]': {
        pointerEvents: 'none',
      },
    },
    loader: {
      marginRight: 's',
    },
    toggleButtonRightElement: {
      height: '100%',
      pointerEvents: 'none',
    },
    triggerOverlay: {
      pointerEvents: isViewMode ? 'unset' : 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 'xs',
      position: isViewMode ? 'initial' : 'absolute',
      top: 0,
      width: '100%',
      // `triggerOverlay` text color should always be transparent so we only see the input's text.
      color: isViewMode ? 'semantic.text.primary' : 'transparent',
      paddingStart: isViewMode ? 'none' : hasLeftElement ? 'xl' : 's',
      paddingEnd: isViewMode ? undefined : 'xxl',
      textStyle: 'body2',
      height: '100%',
    },
    valueRightElement: {
      display: 'inline-flex',
    },
    triggerLeftIcon: {
      ...sharedIconStyles,
      paddingRight: 'xs',
      paddingLeft: 's',
      _disabled: { color: 'semantic.icon.disabled', cursor: 'default' },
    },
    triggerRightIcon: {
      ...sharedIconStyles,
      height: '24px',
      width: '24px',
      borderRadius: 'global.100',
      marginRight: 'xs-s',
      _hover: { backgroundColor: 'semantic.surface.primary.hover' },
      _active: { backgroundColor: 'semantic.surface.primary.pressed' },
      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        transition: 'outline-color 0.2s',
      },
      _disabled: { color: 'semantic.text.disabled', cursor: 'default' },
    },
    placeholder: {
      color: 'semantic.text.disabled',
      display: 'flex',
      minWidth: 0,
      _disabled: {
        color: 'semantic.text.disabled',
      },

      _readOnly: {
        color: 'semantic.text.secondary',
      },

      // Using CSS pseudo element because placeholder should be ignored by a11y tools.
      '::after': {
        content: `"${placeholderValue}"`,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    dropdownMenu: {
      visibility: isOpen ? 'visible' : 'hidden',
      zIndex: 'popover',
      position: strategy,
      top: `${y ?? 0}px`,
      left: `${x ?? 0}px`,
    },
    dropdownMenuContent: {
      textStyle: 'body4Semi',
      borderRadius: 'global.200',
      boxShadow: 500,
      border: 'global.25',
      borderColor: 'semantic.border.static',
      backgroundColor: 'semantic.surface.primary.rest',
      overflow: 'hidden',
      paddingTop: 'xs',
      paddingBottom: shouldShowCreatableOption ? 'none' : 'xs',
      marginTop: 'xs',
    },
    optionsContainer: {
      maxHeight: '248px',
      overflowY: 'auto',
      overflowX: 'hidden',
      textStyle: 'body3',
      _hover: { outline: 'none' },
    },
    sectionLabel: {
      // Override the default "list-item" display of the "li" html tag
      display: 'block',
      padding: 's',
    },
    option: {
      ...sharedOptionStyles,
      color: 'semantic.text.primary',
      outlineColor: 'transparent',
      _hover: { backgroundColor: 'semantic.surface.primary.hover' },
      _focus: {
        backgroundColor: 'semantic.surface.primary.hover',
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '-3px',
        transition: 'outline-color 0.2s',
      },
      _active: { backgroundColor: 'semantic.surface.primary.hover' },
      '&[data-is-selected="true"]': { backgroundColor: 'semantic.surface.primary.selected' },
    },
    checkedIcon: {
      display: 'inline-flex',
      marginLeft: 'auto',
      flexShrink: 0,
    },
    creatableOption: {
      ...sharedOptionStyles,
      cursor: 'default',
    },
    emptyState: {
      ...sharedOptionStyles,
      justifyContent: clickableEmptyState ? 'flex-start' : 'center',
      color: 'semantic.text.secondary',
      _hover: { backgroundColor: clickableEmptyState ? 'none' : 'semantic.text.disabled' },
      _active: { backgroundColor: clickableEmptyState ? 'none' : 'semantic.text.disabled' },
      _disabled: { pointerEvents: 'none' },
    },
    loading: {
      ...sharedOptionStyles,
      justifyContent: 'center',
      color: 'semantic.text.secondary',
      pointerEvents: 'none',
    },
  }),
};
