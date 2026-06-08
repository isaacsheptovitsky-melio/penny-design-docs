import { forwardRef } from 'react';

import { IconButton, type IconButtonProps } from '@/components/action/IconButton';
import { InputRightElement } from '@/components/internal';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

type ClearButtonProps = Omit<IconButtonProps, 'icon' | 'size' | 'variant'>;

export const ClearButton = forwardRef<HTMLDivElement, ClearButtonProps>((props, ref) => {
  const styles = useMultiStyleConfig('SelectNew', {});

  return (
    <InputRightElement data-component="SelectNew.ClearButton" ref={ref} sx={styles['clearButton']}>
      <IconButton {...props} icon="close" size="extra-small" variant="naked" />
    </InputRightElement>
  );
});

ClearButton.displayName = 'SelectNew.ClearButton';
