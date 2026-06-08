import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import { type FloatingCalendarProps } from './FloatingCalendar.types';

export const floatingCalendarTheme: ComponentMultiStyleConfig<
  'container' | 'backButton' | 'calendarContainer',
  Pick<FloatingCalendarProps, 'backButton' | 'legendItems'>
> = {
  parts: ['container', 'backButton', 'calendarContainer'],
  baseStyle: ({ backButton }) => ({
    container: {
      borderRadius: 'semantic.input.default',
      overflow: 'initial',
      width: { xs: '100%', s: 'min-content' },
      paddingY: 'xs',
    },
    calendarContainer: {
      paddingX: 's',
      marginTop: { xs: 'none', s: backButton ? 's' : 'xs' },
      paddingBottom: 'xs',
      position: 'relative',
    },
    backButton: {
      textStyle: 'body3Semi',
      textAlign: 'start',
      paddingX: 's',
      paddingTop: 'xs',
      paddingBottom: 's',
      _hover: {
        backgroundColor: 'semantic.surface.primary.hover',
      },
      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineWidth: '2px',
        outlineOffset: '-2px',
        transition: 'outline-color 0.2s',
      },
    },
  }),
};
