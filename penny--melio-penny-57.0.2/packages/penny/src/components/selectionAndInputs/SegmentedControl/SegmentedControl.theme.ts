import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { applyAllPressableStates } from '@/utils/componentStyle.utils';

import { type SegmentSize } from './components/SegmentedControlItem.types';

export const segmentedControlTheme: ComponentMultiStyleConfig<
  'control' | 'segmentLabel' | 'segmentedControlItem',
  { size?: SegmentSize }
> = {
  parts: ['control', 'segmentLabel', 'segmentedControlItem'],
  baseStyle: {
    control: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 'xxxs',
      padding: 'xxxs',
      backgroundColor: 'semantic.surface.tertiary.rest',
      borderRadius: 'semantic.input.default',
      width: 'fit-content',
      '&[data-is-full-width="true"]': {
        width: '100%',
      },
    },
    segmentedControlItem: {
      display: 'inline-block',
      position: 'relative',
      flexGrow: 1,
      '[data-is-full-width="true"] > &': {
        flex: '1 1 0',
        minWidth: 0,
      },
    },
    segmentLabel: {
      width: '100%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'xs',
      position: 'relative',
      paddingX: 'm',
      textStyle: 'body3',
      whiteSpace: { xs: 'normal', s: 'nowrap' },
      borderRadius: 'semantic.input.default',
      boxSizing: 'border-box',
      border: 'semantic.input.default',
      borderColor: 'semantic.surface.tertiary.rest',
      backgroundColor: 'semantic.surface.tertiary.rest',
      transitionProperty: 'background-color,border-color,color',
      transitionDuration: '0.2s',
      _hover: {
        backgroundColor: 'semantic.surface.tertiary.hover',
      },
      _active: {
        backgroundColor: 'semantic.surface.tertiary.pressed',
      },
      _disabled: applyAllPressableStates({
        backgroundColor: 'semantic.surface.tertiary.rest',
        color: 'semantic.text.disabled',
      }),
      _selected: applyAllPressableStates({
        textStyle: 'body3Semi',
        backgroundColor: 'semantic.surface.tertiary.selected',
        borderColor: 'semantic.border.static',
      }),
    },
  },
  sizes: {
    small: {
      segmentLabel: {
        height: '28px',
      },
    },
    medium: {
      segmentLabel: {
        height: '36px',
      },
    },
    large: {
      segmentLabel: {
        height: '44px',
      },
    },
  },
};
