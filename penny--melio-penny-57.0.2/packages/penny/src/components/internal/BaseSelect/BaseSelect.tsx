import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef, type ReactElement } from 'react';

import { useMultiStyleConfig } from '../../../theme/hooks/use-style-config';

type BaseSelectProps = {
  trigger: ReactElement;
  dropdownMenu: ReactElement;
};

export const BaseSelect = forwardRef<HTMLDivElement, BaseSelectProps>(({ trigger, dropdownMenu, ...props }, ref) => {
  const styles = useMultiStyleConfig('BaseSelect', {});
  const getTestId = useTestId('base-select');

  return (
    <Box data-component="BaseSelect" __css={styles['container']} ref={ref} {...getTestId('container')} {...props}>
      {trigger}
      {dropdownMenu}
    </Box>
  );
});

BaseSelect.displayName = 'BaseSelect';
