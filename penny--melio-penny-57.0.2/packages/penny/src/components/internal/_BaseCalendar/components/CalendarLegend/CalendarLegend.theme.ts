import { type ComponentMultiStyleConfig } from '../../../../../theme/component-style-config-types';
import { getThemeSpacingAsNumber } from '../../../../../theme/foundations';
import { type CalendarLegendProps } from './CalendarLegend';

const textContainerColumnGap = 'xxs';
const indicatorSize = '8px';

export const calendarLegendTheme: ComponentMultiStyleConfig<
  'container' | 'indicator' | 'textContainer' | 'label' | 'date',
  Pick<CalendarLegendProps, 'legendMaxWidth' | 'legendWidth'>
> = {
  parts: ['container', 'indicator', 'textContainer', 'label', 'date'],
  baseStyle: ({ legendWidth, legendMaxWidth }) => ({
    container: {
      display: 'flex',
      flexDir: 'row',
      alignItems: 'baseline',
      gridGap: 'xs',
      width: legendWidth === 'full' ? '100%' : 'fit-content',
      maxWidth: legendMaxWidth,
    },
    indicator: {
      width: indicatorSize,
      height: indicatorSize,
      minWidth: indicatorSize,
      minHeight: indicatorSize,
      borderRadius: 'global.full',
      border: 'global.50',
      borderColor: 'semantic.icon.readOnly',
      bgColor: 'transparent',

      '&[data-variant="primary"]': {
        borderColor: 'semantic.icon.brand',
        bgColor: 'semantic.icon.brand',
      },

      '&[data-variant="secondary"]': {
        borderColor: 'semantic.icon.readOnly',
      },

      '&[data-variant="today"]': {
        border: 'global.25',
        borderStyle: 'dashed',
        borderColor: 'semantic.icon.readOnly',
      },

      '@media (forced-colors: active)': {
        '&[data-variant="primary"]': {
          backgroundColor: 'CanvasText',
          border: 'none',
          borderWidth: 0,
        },
        '&[data-variant="secondary"]': {
          border: 'global.50',
          borderColor: 'CanvasText',
        },
        '&[data-variant="today"]': {
          border: 'global.25',
          borderStyle: 'dashed',
          borderColor: 'CanvasText',
        },
      },
    },
    textContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      color: 'global.neutral.900',
      columnGap: textContainerColumnGap,
      // calculate the max width of the text container based on the full width and spaces.
      maxWidth: `calc(100% - ${`${getThemeSpacingAsNumber(textContainerColumnGap)}px`} - ${indicatorSize})`,
    },
    label: {
      textStyle: 'body4',
      whiteSpace: 'nowrap',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    date: {
      textStyle: 'body4Semi',
      whiteSpace: 'nowrap',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
};
