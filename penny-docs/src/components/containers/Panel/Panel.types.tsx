import type { BoxProps, ResponsiveValue } from '@chakra-ui/react';
import { type PropsWithChildren } from 'react';

import type { SlideProps } from '@/components/foundations/transitions/Slide';
import { type ThemeColorKey } from '@/theme/foundations/colors/types';
import type { ThemeSpaceKey } from '@/theme/foundations/spaces';
import type { GlobalBorderRadiusTokenKey } from '@/theme/foundations/tokens/radii/defaultGlobalBorderRadii.types';

/**
 * The placement options for the panel within its container.
 */
export type PanelPlacement = 'bottom' | 'top' | 'left' | 'right';

/**
 * The position options for the panel.
 */
export type PanelPosition = 'sticky' | 'fixed' | 'absolute';

export type PanelProps = PropsWithChildren<
  {
    /** The background color of the sticky panel. @default 'semantic.surface.inverse' */
    backgroundColor?: ThemeColorKey;
    /** The placement of the sticky panel. @default 'bottom' */
    placement?: PanelPlacement;
    /** Sets the sticky panel position. @default 'sticky' */
    position?: PanelPosition;
    /** The panel's x-axis padding. @default 'm' */
    paddingX?: ThemeSpaceKey;
    /** The panel's y-axis padding. @default 's' */
    paddingY?: ThemeSpaceKey;
    /** The transition configuration for the panel. If provided, the panel will slide to the specified placement. `in` determines if the panel should be visible or not. */
    transitionConfig?: SlideProps & {
      in: SlideProps['in'];
    };
    /** The max-width of the panel. @default '100%' */
    maxWidth?: BoxProps['maxWidth'];
    /** The width of the panel. @default '100%' */
    width?: BoxProps['width'];
    /** The border radius of the panel. */
    borderRadius?: ResponsiveValue<GlobalBorderRadiusTokenKey>;
  } & Pick<SlideProps, 'shouldRenderAlternativeSlide'>
>;
