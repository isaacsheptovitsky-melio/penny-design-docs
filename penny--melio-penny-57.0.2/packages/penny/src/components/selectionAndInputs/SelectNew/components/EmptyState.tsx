import { Box } from '@chakra-ui/react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type SelectNewOption, type SelectNewProps } from '../SelectNew.types';

export type EmptyStateProps<V, O extends SelectNewOption<V>> = Pick<SelectNewProps<V, O>, 'emptyState' | 'data-testid'>;

export const EmptyState = <V, O extends SelectNewOption<V>>({ emptyState, ...otherProps }: EmptyStateProps<V, O>) => {
  const styles = useMultiStyleConfig('SelectNew', {});

  return (
    <Box data-component="SelectNew.EmptyState" __css={styles['emptyState']} {...otherProps}>
      {emptyState}
    </Box>
  );
};

EmptyState.displayName = 'SelectNew.EmptyState';
