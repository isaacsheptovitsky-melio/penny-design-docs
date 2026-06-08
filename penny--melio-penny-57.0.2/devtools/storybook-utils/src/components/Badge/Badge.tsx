import { Box, SystemStyleObject } from '@chakra-ui/react';
import React from 'react';

import { colorPalettes, textStyles } from '../shared-styles';

export type BadgeProps = {
  /**
   * The type of badge
   */
  type?: 'pattern' | 'deprecated' | 'new';
};

const colorsMapStyles = {
  pattern: {
    backgroundColor: colorPalettes.brand['200'],
    color: colorPalettes.brand['700'],
  },
  deprecated: {
    backgroundColor: colorPalettes.critical['200'],
    color: colorPalettes.critical['700'],
  },
  new: {
    backgroundColor: colorPalettes.success['200'],
    color: colorPalettes.success['700'],
  },
  composable: {
    backgroundColor: colorPalettes.informative['200'],
    color: colorPalettes.informative['700'],
  },
};

export const Badge = ({ type = 'pattern' }: BadgeProps) => {
  const styles = {
    display: 'inline-flex',
    paddingX: '8px',
    borderRadius: '12px',
    fontSize: '12px',
    height: '18px',
    alignItems: 'center',
    textTransform: 'capitalize',
    userSelect: 'none',
    ...textStyles,
    ...colorsMapStyles[type],
  } as SystemStyleObject;

  return (
    <Box data-component="Badge" __css={styles}>
      {type}
    </Box>
  );
};

Badge.displayName = 'Storybook.Badge';
