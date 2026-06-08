import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { getThemeSpacingAsNumber } from '@/theme/foundations/spaces';

const headerGap = 'm';
const headerWidth = '100%';
const labelMaxWidth = '80%';

export const collapsibleTheme: ComponentMultiStyleConfig<'header' | 'labelAndIcon' | 'secondaryLabel'> = {
  parts: ['header', 'labelAndIcon', 'secondaryLabel'],
  baseStyle: {
    header: {
      display: 'flex',
      width: headerWidth,
      minHeight: '24px',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: headerGap,
    },
    labelAndIcon: {
      display: 'flex',
      gap: 'xxs',
      alignItems: 'center',
      justifyContent: 'flex-start',
      textStyle: 'body3Semi',
      color: 'semantic.text.secondary',
      width: 'max-content',
      maxWidth: labelMaxWidth,
      flexGrow: 1,

      _hover: {
        color: 'semantic.text.primary',
        cursor: 'pointer',
      },

      '&[data-full-view=true]': {
        width: '100%',
        justifyContent: 'space-between',
        maxWidth: '100%',
      },

      _active: {
        color: 'semantic.text.primary',
      },
    },
    secondaryLabel: {
      display: 'flex',
      alignItems: 'center',
      textStyle: 'body4Semi',
      color: 'semantic.text.secondary',
      flexShrink: 0,
      maxWidth: `calc(${headerWidth} - ${labelMaxWidth} - ${getThemeSpacingAsNumber(headerGap)}px)`,
    },
  },
};
