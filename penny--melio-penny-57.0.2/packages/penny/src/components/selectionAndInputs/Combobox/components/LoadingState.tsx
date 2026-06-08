import { Box } from '@chakra-ui/react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type ComboboxOption, type ComboboxProps } from '../Combobox.types';

export type LoadingStateProps<V, O extends ComboboxOption<V>> = Pick<
  ComboboxProps<V, O>,
  'loadingState' | 'data-testid'
>;

export const LoadingState = <V, O extends ComboboxOption<V>>({
  loadingState,
  ...otherProps
}: LoadingStateProps<V, O>) => {
  const styles = useMultiStyleConfig('Combobox', {});

  return (
    <Box data-component="Combobox.LoadingState" __css={styles['emptyState']} {...otherProps}>
      {loadingState}
    </Box>
  );
};

LoadingState.displayName = 'Combobox.LoadingState';
