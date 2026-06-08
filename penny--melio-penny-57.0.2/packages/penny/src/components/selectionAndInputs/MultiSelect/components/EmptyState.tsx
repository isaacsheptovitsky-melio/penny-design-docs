import { Box } from '@chakra-ui/react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type MultiSelectOption, type MultiSelectProps } from '../MultiSelect.types';

export type EmptyStateProps<V, O extends MultiSelectOption<V>> = Pick<
  MultiSelectProps<V, O>,
  'emptyState' | 'data-testid'
>;

export const EmptyState = <V, O extends MultiSelectOption<V>>({ emptyState, ...otherProps }: EmptyStateProps<V, O>) => {
  const styles = useMultiStyleConfig('MultiSelect', {});

  return (
    <Box data-component="MultiSelect.EmptyState" __css={styles['emptyState']} {...otherProps}>
      {emptyState}
    </Box>
  );
};

EmptyState.displayName = 'MultiSelect.EmptyState';
