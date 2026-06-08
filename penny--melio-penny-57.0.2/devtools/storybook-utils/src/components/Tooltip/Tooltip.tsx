import { Tooltip as ChakraTooltip, TooltipProps as ChakraTooltipProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { colorPalettes, FONT_FAMILY, FONT_WEIGHT } from '../shared-styles';

export type TooltipProps = Pick<ChakraTooltipProps, 'label' | 'children'> & {
  /**
   * The tooltip's label
   */
  label: string;
  /**
   * The tooltip's placement
   */
  placement?: ChakraTooltipProps['placement'];
  /**
   * The DOM node that will trigger the tooltip on hover.
   */
  children: ReactNode;
};

const styles = {
  fontFamily: FONT_FAMILY,
  fontWeight: FONT_WEIGHT,
  padding: '8px',
  borderRadius: '4px',
  fontSize: '14px',
  maxWidth: '300px',
  color: colorPalettes.neutral['100'],
  bg: '#171923',
  width: 'max-content',
  whiteSpace: 'pre-wrap',
};

export const Tooltip = ({ placement = 'top', ...props }: TooltipProps) => (
  <ChakraTooltip
    data-component="Tooltip"
    {...styles}
    wordBreak="break-word"
    {...props}
    placement={placement}
    hasArrow
    shouldWrapChildren
  />
);

Tooltip.displayName = 'Storybook.Tooltip';
