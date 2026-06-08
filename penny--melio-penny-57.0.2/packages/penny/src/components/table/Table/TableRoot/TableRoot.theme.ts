import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { type InternalCSSObject } from '@/theme/types';

const rowHeight = 72;

const getSharedRowStyles = (isSubRow?: boolean, isLastSubRow?: boolean, isRowHighlighted?: boolean) =>
  ({
    display: 'flex',
    height: 'auto',
    minHeight: `${rowHeight}px`,
    backgroundColor: isSubRow
      ? isRowHighlighted
        ? 'semantic.surface.secondary.selected'
        : 'semantic.surface.secondary.rest'
      : isRowHighlighted
        ? 'semantic.surface.primary.selected'
        : 'semantic.surface.primary.rest',
    transition: `background-color ${isRowHighlighted ? 0.3 : 0.1}s ease-in-out`,

    '> div:first-of-type': {
      borderBottom: isSubRow && !isLastSubRow ? 'none' : ('1px solid' as never),
      borderColor: 'semantic.border.static',
    },
  }) as InternalCSSObject;

export const tableTheme: ComponentMultiStyleConfig<
  'container' | 'table' | 'headerRow' | 'tableBody' | 'row' | 'clickableRow' | 'loaderContainer',
  {
    isSubRow?: boolean;
    isLastSubRow?: boolean;
    tableWidth?: number;
    isRowHighlighted?: boolean;
    isLoading?: boolean;
  }
> = {
  parts: ['container', 'table', 'headerRow', 'tableBody', 'row', 'clickableRow', 'loaderContainer'],
  baseStyle: ({ isSubRow, isLastSubRow, isRowHighlighted, isLoading }) => ({
    container: {
      isolation: 'isolate',
      overflowX: 'auto',
      overflowY: isLoading ? 'hidden' : 'visible',
      width: '100%',
      position: 'relative',
      '&[data-has-header-sticky="true"]': {
        overflowX: 'initial',
      },
    },
    loaderContainer: {
      backgroundColor: 'semantic.surface.primary.rest',
      height: `calc(5 * ${rowHeight}px)`,
      width: '100%',
      position: 'relative',
      outline: 0,
    },
    table: {
      display: 'grid',
      flexDirection: 'column',
      height: '100%',
    },
    tableBody: {
      position: 'relative',
      height: isLoading ? 0 : 'auto',
      flexGrow: 1,
      opacity: isLoading ? 0 : 1,
    },
    tableHead: {
      '&[data-is-sticky="true"]': {
        position: 'sticky',
        top: 0,
        zIndex: 'sticky',
      },
    },
    headerRow: {
      ...getSharedRowStyles(),
      borderTopRadius: 'global.200',
      height: 'auto',
      minHeight: '48px',
    },
    row: {
      ...getSharedRowStyles(isSubRow, isLastSubRow, isRowHighlighted),
    },
    clickableRow: {
      ...getSharedRowStyles(isSubRow, isLastSubRow, isRowHighlighted),
      cursor: 'pointer',
      outlineColor: 'transparent',
      transition: 'outline-color 0.2s ease-in-out',

      _hover: {
        backgroundColor: isSubRow ? 'semantic.surface.secondary.hover' : 'semantic.surface.primary.hover',
      },

      _active: {
        backgroundColor: isSubRow ? 'semantic.surface.secondary.pressed' : 'semantic.surface.primary.pressed',
      },

      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '-2px',
      },
    },
  }),
};
