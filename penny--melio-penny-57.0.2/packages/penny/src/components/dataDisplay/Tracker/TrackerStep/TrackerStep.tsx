import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { useTrackerContext } from '../TrackerContext';
import { TrackerStepIndicator } from './components';
import type { TrackerStepProps } from './TrackerStep.types';
import { TrackerStepContext } from './TrackerStepContext';

export const TrackerStep = forwardRef<HTMLDivElement, TrackerStepProps>(
  (
    {
      isActive = false,
      isCompleted = false,
      'data-is-first': dataIsFirst,
      'data-is-last': dataIsLast,
      'data-is-single': dataIsSingle,
      'data-index': dataIndex,
      'data-testid': dataTestId,
      indicator,
      children,
      ...props
    },
    ref
  ) => {
    const { variant, width, stepsAmount, status, 'data-testid': trackerTestId } = useTrackerContext();
    const baseTestId =
      dataTestId ?? (trackerTestId ? `${trackerTestId}-step-${dataIndex}` : `tracker-step-${dataIndex}`);
    const getTestId = useTestId(baseTestId);

    const sharedDataAttributes = {
      'data-is-first': dataIsFirst,
      'data-is-last': dataIsLast,
      'data-is-single': dataIsSingle,
      ...(isCompleted && { 'data-is-completed': 'true' }),
      ...(isActive && { 'data-is-active': 'true' }),
    };

    const styles = useMultiStyleConfig('TrackerStep', {
      width,
      variant,
      stepMaxWidth: variant === 'horizontal' ? `${100 / stepsAmount}%` : '100%',
      status,
    });

    return (
      <TrackerStepContext.Provider value={{ variant, isActive, isCompleted, status }}>
        <Box
          as="li"
          data-component="TrackerStep"
          __css={styles['stepContainer']}
          aria-current={isActive ? 'step' : undefined}
          {...sharedDataAttributes}
          {...props}
          {...getTestId()}
          ref={ref}
        >
          {!dataIsSingle && <Box __css={styles['connector']} {...sharedDataAttributes} />}
          <Box __css={styles['grid']}>
            <TrackerStepIndicator {...sharedDataAttributes} {...getTestId('indicator')}>
              {indicator}
            </TrackerStepIndicator>
            {children && (
              <Box __css={styles['content']} {...getTestId('content')}>
                {children}
              </Box>
            )}
          </Box>
        </Box>
      </TrackerStepContext.Provider>
    );
  }
);

TrackerStep.displayName = 'TrackerStep';
