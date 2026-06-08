/* eslint-disable max-lines */
import { type ComponentMultiStyleConfig } from '../../../theme/component-style-config-types';
import { getThemeSpacingAsNumber } from '../../../theme/foundations';
import type { _BaseCalendarProps } from './_BaseCalendar.types';

const baseHeaderHeight = 32;
const getHeaderHeight = (isMobileDatePicker?: boolean) =>
  isMobileDatePicker ? `${baseHeaderHeight + getThemeSpacingAsNumber('xs') * 2}px` : `${baseHeaderHeight}px`;
const headerTitleHeight = `calc(${baseHeaderHeight}px + ${getThemeSpacingAsNumber('xs')}px)`;

export const _baseCalendarTheme: ComponentMultiStyleConfig<
  | 'container'
  | 'content'
  | 'cell'
  | 'calendarRow'
  | 'cellLabel'
  | 'header'
  | 'calendar'
  | 'headerCell'
  | 'monthContainer'
  | 'yearSelectionHeaderTrigger'
  | 'yearSelectionHeader'
  | 'yearSelectionContainer'
  | 'yearSelectionList'
  | 'yearSelectionListItem'
  | 'yearSelectionListItemTrigger'
  | 'monthSelectionGrid'
  | 'monthSelectionCell'
  | 'legendsList',
  Pick<_BaseCalendarProps, 'size'> & { isMobileDatePicker?: boolean }
> = {
  parts: [
    'container',
    'content',
    'cell',
    'cellLabel',
    'calendarRow',
    'header',
    'calendar',
    'headerCell',
    'monthContainer',
    'yearSelectionHeaderTrigger',
    'yearSelectionHeader',
    'yearSelectionContainer',
    'yearSelectionList',
    'yearSelectionListItem',
    'yearSelectionListItemTrigger',
    'monthSelectionGrid',
    'monthSelectionCell',
    'legendsList',
  ],
  baseStyle: ({ isMobileDatePicker }) => ({
    container: {
      width: isMobileDatePicker ? '100%' : '304px',
      display: 'flex',
      flexDir: 'column',
      color: 'semantic.text.primary',
      gridGap: 'xs',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDir: 'row',
      alignItems: 'center',
      paddingY: isMobileDatePicker ? 'xs' : 'none',
      height: getHeaderHeight(isMobileDatePicker),

      "&[data-year-selection-open='true']": {
        justifyContent: 'center',
      },
    },
    monthContainer: {
      display: 'flex',
      flexDirection: 'column',
      rowGap: isMobileDatePicker ? 'xs' : 'xxxs',

      "&[data-hidden='true']": {
        visibility: 'hidden',
      },
    },
    calendar: {
      display: 'grid',
      width: isMobileDatePicker ? '100%' : 'fit-content',
      _disabled: {
        pointerEvents: 'none',
        opacity: 0.5,
      },
    },
    calendarRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
    },
    headerCell: {
      width: '40px',
      height: '40px',
      textStyle: 'body4Semi',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textTransform: 'uppercase',
      userSelect: 'none',
      textAlign: 'center',
      color: 'semantic.text.secondary',
    },
    cell: {
      width: '40px',
      height: '40px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textStyle: 'body3',
      border: 'global.50',
      borderColor: 'global.neutral.A0',
      borderRadius: 'global.full',
      cursor: 'pointer',
      color: 'semantic.text.primary',

      '&:hover[aria-selected]:not([aria-selected="true"]):not([aria-disabled="true"])': {
        bgColor: 'semantic.surface.primary.hover',
      },
      '&[data-secondary-selected-date="true"][aria-selected="false"]': {
        border: 'global.50',
        borderColor: 'semantic.border.interactive.rest',
      },
      _selected: {
        color: 'semantic.text.inverse',
        bgColor: 'semantic.fill.brand.primary',

        '&[data-secondary-selected-date="true"]': {
          border: 'global.50',
          borderColor: 'semantic.border.interactive.rest',
          bgColor: 'semantic.fill.primary',
        },
      },
      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineStyle: 'solid',
        outlineWidth: '2px',
        outlineOffset: '2px',
      },
      _disabled: {
        color: 'semantic.text.disabled',
        cursor: 'initial',
      },
      // `showToday` date style: applied only when the date is today's date and it's not selected / secondarySelected.
      '&[data-show-today="true"][aria-current="date"][data-secondary-selected-date="false"][aria-selected="false"]': {
        border: 'global.25',
        borderStyle: 'dashed',
        borderColor: 'semantic.border.interactive.rest',

        _disabled: {
          color: 'semantic.text.disabled',
        },
      },

      '@media (forced-colors: active)': {
        border: 'none',
        '&[data-secondary-selected-date="true"][aria-selected="false"]': {
          border: 'global.50',
          borderColor: 'global.neutral.A0',
        },
        '&[aria-selected="true"]': {
          bgColor: 'Canvas',
        },
        '&[data-secondary-selected-date="true"][aria-selected="true"]': {
          border: 'global.50',
          borderColor: 'global.neutral.A0',
          bgColor: 'Canvas',
        },
        '&[data-show-today="true"][aria-current="date"][data-secondary-selected-date="false"][aria-selected="false"]': {
          border: 'none',
        },
      },
    },
    cellLabel: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'global.full',

      '&[data-selected-date="true"]': {
        backgroundColor: 'semantic.fill.brand.primary',

        '&[data-secondary-selected-date="true"]': {
          border: 'global.50',
          borderColor: 'semantic.border.inverse',
        },
      },

      '@media (forced-colors: active)': {
        '&[data-selected-date="true"]': {
          backgroundColor: 'CanvasText',
        },
      },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
    },
    yearSelectionHeader: {
      display: 'flex',
      alignItems: 'center',
    },
    yearSelectionHeaderTrigger: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
      borderRadius: 'global.200',

      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineStyle: 'solid',
        outlineWidth: '2px',
        outlineOffset: '-3px',
      },
    },
    yearSelectionContainer: {
      display: 'flex',
      flexDirection: 'column',
      rowGap: isMobileDatePicker ? 'xs' : 'none',
      position: 'absolute',
      backgroundColor: 'semantic.surface.primary.rest',
      zIndex: 'docked',
      inset: 0,
      width: '100%',
      height: `calc(100% - ${headerTitleHeight})`,
      paddingTop: isMobileDatePicker ? 'xs' : 'xxs',
      top: headerTitleHeight,
    },
    yearSelectionList: {
      display: 'flex',
      flexDirection: 'column',
      borderTop: 'global.25',
      borderColor: 'semantic.border.static',
      overflowY: 'auto',
      height: '100%',
    },
    yearSelectionListItem: {
      display: 'flex',
      flexDirection: 'column',
      rowGap: isMobileDatePicker ? 'xs' : 'none',
      width: '100%',
      borderBottom: 'global.25',
      borderColor: 'semantic.border.static',
    },
    yearSelectionListItemTrigger: {
      display: 'flex',
      justifyContent: 'center',
      padding: 's',
      backgroundColor: 'semantic.surface.primary.rest',
      textStyle: 'body2Semi',
      color: 'semantic.text.secondary',
      outlineColor: 'semantic.focus.primary',
      outlineOffset: '-1px',

      _expanded: {
        backgroundColor: 'semantic.surface.secondary.rest',
        color: 'semantic.text.primary',
      },

      _disabled: {
        pointerEvents: 'none',
        color: 'semantic.text.disabled',
      },

      _hover: {
        backgroundColor: 'semantic.surface.secondary.rest',
        color: 'global.neutral.900',
        transition: 'color 0.1s, background-color 0.1s',

        _expanded: {
          backgroundColor: 'semantic.surface.secondary.rest',
        },
      },

      _active: {
        backgroundColor: 'semantic.surface.secondary.hover',

        _expanded: {
          backgroundColor: 'semantic.surface.secondary.rest',
          color: 'semantic.text.primary',
        },
      },

      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '-2px',
        outlineStyle: 'solid',
        outlineWidth: '2px',
      },
    },
    monthSelectionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: 'xs',
      padding: 's',
      paddingTop: 'none',
      backgroundColor: 'semantic.surface.secondary.rest',
    },
    monthSelectionCell: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      minWidth: '88px',
      padding: 'xs',
      borderRadius: 'semantic.action.default',
      textStyle: 'body4Semi',

      _hover: {
        bgColor: 'semantic.surface.primary.hover',
      },
      _active: {
        bgColor: 'semantic.fill.brand.primary',
        color: 'semantic.text.inverse',
      },
      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '2px',
        outlineStyle: 'solid',
        outlineWidth: '2px',
      },
      _disabled: {
        pointerEvents: 'none',
        color: 'semantic.text.disabled',
      },

      '@media (forced-colors: active)': {
        '&[data-active="true"]': {
          border: 'global.25',
          borderColor: 'global.neutral.A0',
        },
      },
    },
    legendsList: {
      paddingLeft: 'xs',
    },
  }),
  sizes: {
    small: ({ isMobileDatePicker }) => ({
      calendar: {
        rowGap: isMobileDatePicker ? 'xs' : 'xxs',
      },
      calendarRow: {
        columnGap: isMobileDatePicker ? 'xs' : 'none',
      },
    }),
    large: ({ isMobileDatePicker }) => ({
      calendar: {
        rowGap: isMobileDatePicker ? 'xs' : 'xxxs',
      },
      calendarRow: {
        columnGap: 'xxs',
      },
    }),
  },
};
