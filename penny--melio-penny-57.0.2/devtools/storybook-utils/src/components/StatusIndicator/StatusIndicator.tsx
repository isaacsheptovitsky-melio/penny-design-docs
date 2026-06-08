import { Box, SystemStyleObject } from '@chakra-ui/react';

import { colorPalettes } from '../shared-styles';

export type StatusIndicatorProps = {
  /**
   * The status of status indicator
   */
  status?: 'primary' | 'informative' | 'success' | 'warning' | 'error';
};

const colorsMapStyles = {
  primary: {
    backgroundColor: colorPalettes.brand['700'],
  },
  informative: {
    backgroundColor: colorPalettes.informative['700'],
  },
  success: {
    backgroundColor: colorPalettes.success['700'],
  },
  warning: {
    backgroundColor: colorPalettes.warning['700'],
  },
  error: {
    backgroundColor: colorPalettes.critical['700'],
  },
};

export const StatusIndicator = ({ status = 'success' }: StatusIndicatorProps) => {
  const styles = {
    display: 'inline-flex',
    width: '8px',
    height: '8px',
    borderRadius: '100%',
    ...colorsMapStyles[status],
  } as SystemStyleObject;

  return <Box data-component="StatusIndicator" __css={styles} />;
};

StatusIndicator.displayName = 'Storybook.StatusIndicator';
