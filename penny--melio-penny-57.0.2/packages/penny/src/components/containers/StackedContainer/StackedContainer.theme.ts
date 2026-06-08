import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { type InternalCSSObject } from '@/theme/types';

import { BorderStyle } from '../Container/Container.theme.utils';
import { type StackedContainerProps } from './StackedContainer.types';

const STACK_HEIGHT_IN_PX = 10;

export const stackedContainerTheme: ComponentMultiStyleConfig<
  'wrapper' | 'container' | 'stacksContainerItemsWrapper' | 'firstStack' | 'secondStack',
  Pick<StackedContainerProps, 'paddingX' | 'paddingY' | 'border' | 'stacksToDisplay'>
> = {
  parts: ['wrapper', 'container', 'stacksContainerItemsWrapper', 'firstStack', 'secondStack'],
  baseStyle: ({ paddingX, paddingY, border, stacksToDisplay }) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const bordersStyles = BorderStyle[border!];
    const { border: borderType, borderRadius, borderColor } = bordersStyles;
    const stackCss = {
      borderBottom: borderType,
      borderRight: borderType,
      borderLeft: borderType,
      borderColor,
      height: `${STACK_HEIGHT_IN_PX}px`,
      borderBottomRadius: borderRadius,
    } as InternalCSSObject;

    const wrapperStyle = {
      position: 'relative',
      ...(stacksToDisplay > 0 && {
        marginBottom: `${2 * STACK_HEIGHT_IN_PX}px`,
      }),
    } as InternalCSSObject;

    return {
      wrapper: { ...wrapperStyle },
      container: {
        paddingX,
        paddingY,
        ...bordersStyles,
        backgroundColor: 'transparent',
        // This overrides Chakra's Box's default of maxWidth: 60ch
        maxWidth: 'none',
        overflow: 'hidden',
      },
      stacksContainerItemsWrapper: {
        position: 'absolute',
        bottom: `${stacksToDisplay * STACK_HEIGHT_IN_PX * -1}px`,
        width: '100%',
      },
      firstStack: {
        ...stackCss,
        marginX: 'xs',
      },
      secondStack: {
        ...stackCss,
        marginX: 's',
      },
    };
  },
};
