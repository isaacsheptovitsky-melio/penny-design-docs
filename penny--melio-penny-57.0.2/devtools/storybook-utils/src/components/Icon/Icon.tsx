import { Box, SystemStyleObject } from '@chakra-ui/react';

import { colorPalettes } from '../shared-styles';
import { IconKey, icons } from './icons';

export type IconProps = {
  /**
   * The type of the icon
   */
  type?: IconKey;
  /**
   * The color of the icon
   */
  color?: 'brand' | 'black' | 'light';
};

const colorsMapStyles = {
  brand: {
    color: colorPalettes.brand['700'],
  },
  black: {
    color: colorPalettes.neutral['1000'],
  },
  light: {
    color: colorPalettes.neutral['400'],
  },
};

export const Icon = ({ type = 'info', color = 'black' }: IconProps) => {
  const styles = {
    display: 'inline-flex',
    ...colorsMapStyles[color],
  } as SystemStyleObject;

  const icon = icons[type];

  return (
    <Box data-component="Icon" __css={styles}>
      <Box as={icon} />
    </Box>
  );
};

Icon.displayName = 'Storybook.Icon';
