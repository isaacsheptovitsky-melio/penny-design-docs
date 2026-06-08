import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { type InternalCSSObject } from '@/theme/types';

import { type ColSize, getFixedCellSize } from './FormLineItems.types';

const cellAttributesBySize: Record<ColSize, InternalCSSObject> = {
  xs: {
    minWidth: '48px',
    flexShrink: 0,
    flexBasis: 0,
  },
  s: {
    minWidth: '80px',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  m: {
    minWidth: '160px',
    flexGrow: 2,
    flexShrink: 0,
    flexBasis: 0,
  },
  l: {
    minWidth: '240px',
    flexGrow: 3,
    flexShrink: 0,
    flexBasis: 0,
  },
  xl: {
    minWidth: '320px',
    flexGrow: 4,
    flexShrink: 0,
    flexBasis: 0,
  },
  xxl: {
    minWidth: '400px',
    flexGrow: 5,
    flexShrink: 0,
    flexBasis: 0,
  },
};

export const formLineItemsTheme: ComponentMultiStyleConfig<
  'container' | 'headerRow' | 'headerCell' | 'headerCellContent' | 'body' | 'row' | 'cell' | 'cellContent',
  { size?: ColSize; hasOverflowX?: boolean }
> = {
  parts: ['container', 'headerRow', 'headerCell', 'headerCellContent', 'body', 'row', 'cell', 'cellContent'],
  baseStyle: ({ size, hasOverflowX }) => ({
    container: {
      width: '100%',
      height: '100%',
      isolation: 'isolate',
      overflowX: 'auto',
      overflowY: 'hidden',
      position: 'relative',
      borderTopRadius: 'global.200',
      ...(hasOverflowX && {
        '[data-is-sticky="true"]': {
          '&[data-component="FormLineItemsHeaderCell"]': {
            borderLeft: 'global.25',
            borderColor: 'semantic.border.static',
            position: 'sticky',
            right: 0,
            top: 0,
          },
          '&[data-component="FormLineItemsCell"]': {
            zIndex: 'sticky',
            borderLeft: 'global.25',
            borderColor: 'semantic.border.static',
            position: 'sticky',
            top: 0,
            right: 0,
            boxShadow: 400,
            '[data-is-sticky="true"]': {
              marginLeft: 's',
            },
          },
        },
      }),
    },
    headerRow: {
      display: 'flex',
      minHeight: '48px',
    },
    headerCell: {
      boxSizing: 'content-box',
      backgroundColor: 'semantic.surface.secondary.rest',
      borderBottom: 'global.25',
      borderColor: 'global.neutral.300',
      ...getFixedCellSize(size),
      height: '48px',
    },
    // We need a cell content layer cause flex doesn't play well with padding
    headerCellContent: {
      overflowX: 'hidden',
      marginX: 'xs',
      marginY: 's',
    },
    body: {
      position: 'relative',
      backgroundColor: 'semantic.surface.primary.rest',
      flexGrow: 1,
      '&[data-loading="true"]': {
        minHeight: '96px',
      },
    },
    row: {
      position: 'relative',
      display: 'flex',
      ':first-of-type': {
        '> div': {
          paddingTop: 'm',
        },
      },
    },
    cell: {
      boxSizing: 'content-box',
      backgroundColor: 'semantic.surface.primary.rest',
      height: '72px',
      overflow: 'hidden',
      ...getFixedCellSize(size),
    },
    // We need a cell content layer cause flex doesn't play well with padding
    cellContent: {
      height: '100%',
      marginX: 'xs',
      marginY: 'xxs',
    },
  }),
  sizes: {
    xs: {
      cell: {
        ...cellAttributesBySize['xs'],
      },
      headerCell: {
        ...cellAttributesBySize['xs'],
      },
    },
    s: {
      cell: {
        ...cellAttributesBySize['s'],
      },
      headerCell: {
        ...cellAttributesBySize['s'],
      },
    },
    m: {
      cell: {
        ...cellAttributesBySize['m'],
      },
      headerCell: {
        ...cellAttributesBySize['m'],
      },
    },
    l: {
      cell: {
        ...cellAttributesBySize['l'],
      },
      headerCell: {
        ...cellAttributesBySize['l'],
      },
    },
    xl: {
      cell: {
        ...cellAttributesBySize['xl'],
      },
      headerCell: {
        ...cellAttributesBySize['xl'],
      },
    },
    xxl: {
      cell: {
        ...cellAttributesBySize['xxl'],
      },
      headerCell: {
        ...cellAttributesBySize['xxl'],
      },
    },
  },
};
