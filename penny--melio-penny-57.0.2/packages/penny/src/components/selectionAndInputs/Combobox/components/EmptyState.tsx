import { Box } from '@chakra-ui/react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type ComboboxOption, type ComboboxProps } from '../Combobox.types';

export type EmptyStateProps<V, O extends ComboboxOption<V>> = Pick<ComboboxProps<V, O>, 'emptyState' | 'data-testid'>;

export const EmptyState = <V, O extends ComboboxOption<V>>({ emptyState, ...otherProps }: EmptyStateProps<V, O>) => {
  const styles = useMultiStyleConfig('Combobox', {});

  return (
    <Box data-component="Combobox.EmptyState" __css={styles['emptyState']} {...otherProps}>
      {emptyState}
    </Box>
  );
};

EmptyState.displayName = 'Combobox.EmptyState';
