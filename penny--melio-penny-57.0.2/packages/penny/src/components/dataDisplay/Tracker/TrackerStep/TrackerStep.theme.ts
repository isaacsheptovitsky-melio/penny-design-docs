import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { type ThemeColorKey } from '@/theme/foundations/colors/types';
import { themeSpaces } from '@/theme/foundations/spaces';
import { textStyles } from '@/theme/foundations/text-styles';

import type { TrackerProps, TrackerStatus } from '../Tracker.types';

const backgroundColor: Record<TrackerStatus, ThemeColorKey> = {
  warning: 'semantic.fill.warning.primary',
  critical: 'semantic.fill.critical.primary',
  success: 'semantic.fill.success.primary',
  neutral: 'semantic.fill.inverse',
  brand: 'semantic.fill.brand.primary',
  informative: 'semantic.fill.informative.primary',
};

const indicatorContainerSize = 24;
const indicatorContainerHalfSize = indicatorContainerSize / 2;

const connectorThickness = 2;

const borderThickness = 2;
const borderThicknessHalf = borderThickness / 2;

const verticalPadding = themeSpaces.s;

const horizontalStyles = {
  gridTemplateAreas: `"indicator"
    "content"`,
  gridTemplateRows: `${textStyles.body3Semi.lineHeight} auto auto`,
  alignItems: 'center',
  gridRowGap: 's',
};

const verticalStyles = {
  gridTemplateAreas: `"indicator content"
  ". content"`,
  gridTemplateColumns: `${textStyles.body3Semi.lineHeight} auto`,
  alignItems: 'flex-start',
  gridColumnGap: 's',
  width: '100%',
};

export const trackerStepTheme: ComponentMultiStyleConfig<
  'stepContainer' | 'grid' | 'stepIndicatorContainer' | 'stepIndicator' | 'content' | 'connector',
  Pick<TrackerProps, 'variant' | 'width'> & {
    status: TrackerStatus;
    stepMaxWidth?: string;
  }
> = {
  parts: ['stepContainer', 'grid', 'stepIndicatorContainer', 'stepIndicator', 'content', 'connector'],
  baseStyle: ({ width, stepMaxWidth, status }) => ({
    stepContainer: {
      width: width === 'full' ? stepMaxWidth : 'fit-content',
      maxWidth: stepMaxWidth,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    grid: {
      display: 'grid',
    },
    connector: {
      position: 'absolute',
      backgroundColor: 'semantic.fill.tertiary',

      '@media (forced-colors: active)': {
        border: '1px dashed',
        borderColor: 'global.neutral.A0',
      },

      '&[data-is-completed]': {
        backgroundColor: backgroundColor[status],

        '@media (forced-colors: active)': {
          border: 'global.25',
        },
      },
      '&[data-is-last]': {
        display: 'none',
      },
    },
    stepIndicatorContainer: {
      display: 'inline-flex',
      gridArea: 'indicator',
      justifySelf: 'center',
      alignSelf: 'center',
      zIndex: 1,
      _before: {
        content: '""',
        width: '28px',
        height: '28px',
        position: 'absolute',
        borderRadius: 'global.full',
        backgroundColor: 'semantic.border.inverse',
        top: `calc(${indicatorContainerHalfSize}px - ${connectorThickness}px)`,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: -1,
      },
    },
    stepIndicator: {
      display: 'flex',
      position: 'relative',
      width: '20px',
      height: '20px',
      borderRadius: 'global.full',
      backgroundColor: 'semantic.fill.primary',
      color: status === 'warning' ? 'semantic.text.primary' : 'semantic.text.inverse',
      justifyContent: 'center',
      alignItems: 'center',
      border: `${borderThickness}px solid` as never,

      '@media (forced-colors: active)': {
        border: `${borderThickness}px dashed` as never,
      },

      borderColor: 'semantic.border.static',
      boxSizing: 'content-box',
      '&[data-is-completed]': {
        backgroundColor: backgroundColor[status],
        borderColor: backgroundColor[status],

        '@media (forced-colors: active)': {
          border: `${borderThickness}px solid` as never,
        },
      },
      '&[data-is-active]': {
        backgroundColor: 'semantic.fill.primary',
        borderColor: backgroundColor[status],

        '@media (forced-colors: active)': {
          border: `${borderThickness}px solid` as never,
        },
      },
    },
    content: {
      gridArea: 'content',
      display: 'flex',
      flex: 1,
      width: 'fit-content',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'xxs',
      paddingX: 'xxs',
      maxWidth: '100%',
      '&[data-is-first]': {
        paddingLeft: 'none',
      },
      '&[data-is-last]': {
        paddingRight: 'none',
      },
    },
  }),
  variants: {
    horizontal: () => ({
      stepContainer: {
        alignItems: 'center',
      },
      grid: horizontalStyles,
      connector: {
        height: `${connectorThickness}px`,
        top: `calc(${indicatorContainerHalfSize}px - ${connectorThickness}px)`,
        width: '100%',
        left: '50%',
      },
      content: {
        textAlign: 'center',
      },
    }),
    vertical: ({ stepMaxWidth }) => ({
      stepContainer: {
        alignItems: 'flex-start',
        paddingTop: 's',
        paddingBottom: 's',
        maxWidth: stepMaxWidth,
        '&[data-is-first]': {
          paddingTop: 'none',
        },
        '&[data-is-last]': {
          paddingBottom: 'none',
        },
        '&[data-is-single]': {
          paddingTop: 'none',
          paddingBottom: 'none',
        },
      },
      stepIndicatorContainer: {
        zIndex: 1,
        _before: {
          content: '""',
          width: '28px',
          height: '28px',
          position: 'absolute',
          borderRadius: 'global.full',
          backgroundColor: 'semantic.icon.inverse',
          top: `calc(${indicatorContainerHalfSize}px + ${verticalPadding})`,
          left: `calc(${indicatorContainerHalfSize}px - ${connectorThickness}px)`,
          transform: 'translate(-50%, -50%)',
          zIndex: -1,
        },
        '&[data-is-first]::before': {
          top: `calc(${indicatorContainerHalfSize}px)`,
        },
      },
      grid: verticalStyles,
      connector: {
        height: '100%',
        top: `calc(${indicatorContainerHalfSize}px + ${verticalPadding})`,
        width: `${connectorThickness}px`,
        left: `calc(${indicatorContainerHalfSize}px - ${connectorThickness}px - ${borderThicknessHalf}px)`,
        '&[data-is-first]': {
          top: verticalPadding,
        },
      },
      stepIndicator: {
        display: 'inline-flex',
      },
      content: {
        alignItems: 'flex-start',
        gap: 'xxxs',
        width: '100%',
        paddingX: 'none',
        marginTop: 'xxxs',
        textAlign: 'left',
        '&[data-is-last]': {
          paddingBottom: 'none',
        },
      },
    }),
  },
};
