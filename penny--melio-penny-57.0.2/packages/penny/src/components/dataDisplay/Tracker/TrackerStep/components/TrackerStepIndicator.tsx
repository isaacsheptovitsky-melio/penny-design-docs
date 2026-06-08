import { Box } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

import { Icon } from '@/components/foundations/Icon';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { DataAttributes, TrackerProps } from '../../Tracker.types';
import { useTrackerStepContext } from '../TrackerStepContext';

type TrackerStepIndicatorProps = PropsWithChildren<DataAttributes>;

export const TrackerStepIndicator = ({
  children,
  'data-is-first': dataIsFirst,
  'data-is-last': dataIsLast,
  'data-is-single': dataIsSingle,
  ...props
}: TrackerStepIndicatorProps) => {
  const { variant, isCompleted, isActive, status } = useTrackerStepContext();
  const styles = useMultiStyleConfig('TrackerStep', { variant, status: status as NonNullable<TrackerProps['status']> });

  const completedIcon = <Icon type="checked-mini" color="inherit" size="small" aria-hidden />;

  const sharedDataAttributes = {
    'data-is-first': dataIsFirst,
    'data-is-last': dataIsLast,
    'data-is-single': dataIsSingle,
    ...(isCompleted && { 'data-is-completed': 'true' }),
    ...(isActive && { 'data-is-active': 'true' }),
  };

  return (
    <Box __css={styles['stepIndicatorContainer']} {...sharedDataAttributes}>
      <Box __css={styles['stepIndicator']} {...props}>
        {children}
        {!children && isCompleted && completedIcon}
      </Box>
    </Box>
  );
};

TrackerStepIndicator.displayName = 'TrackerStepIndicator';
