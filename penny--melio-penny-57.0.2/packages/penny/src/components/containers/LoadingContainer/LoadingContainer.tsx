import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Loader } from '@/components/foundations/Loader';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type LoadingContainerProps } from './LoadingContainer.types';

/**
 * A container that displays a loading spinner overlay when content is being loaded.
 */
export const LoadingContainer = forwardRef<HTMLDivElement, LoadingContainerProps>(
  (
    { children, isLoading, loadingText, hideLoadingText, 'data-testid': dataTestId = 'loading-container', ...props },
    ref
  ) => {
    const styles = useMultiStyleConfig('LoadingContainer', { isLoading });

    const getTestId = useTestId(dataTestId);

    return (
      <Box __css={styles['loadingContainer']} data-component="LoadingContainer" {...getTestId()} {...props} ref={ref}>
        {isLoading && (
          <Box {...getTestId('loader')} __css={styles['loaderContainer']}>
            <Loader loadingText={loadingText} hideLoadingText={hideLoadingText} />
          </Box>
        )}
        <Box __css={styles['childrenContainer']} {...getTestId('children-container')}>
          {children}
        </Box>
      </Box>
    );
  }
);

LoadingContainer.displayName = 'LoadingContainer';
