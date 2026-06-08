import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';

import { Button } from '@/components/action/Button';
import { Icon } from '@/components/foundations/Icon';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

type CreatableOptionProps = {
  isHighlighted: boolean;
  isFocused: boolean;
  message: string;
  role: string;
  children?: ReactNode;
};

export const CreatableOption = forwardRef<HTMLButtonElement, CreatableOptionProps>(
  // We need to destructure the `role` prop to avoid counting it as an option by screen readers.
  ({ isHighlighted, isFocused, message, children, role, ...props }, ref) => {
    const styles = useMultiStyleConfig('BaseSelect', {});
    const getTestId = useTestId('base-select');

    return (
      <Box data-component="BaseSelect.CreatableOption" __css={styles['creatableOption']}>
        <Button
          variant="secondary"
          isFullWidth
          label={message}
          ref={ref}
          {...getTestId('creatable-option')}
          {...props}
          leftElement={<Icon size="small" type="add" color="inherit" aria-hidden />}
          data-hover={isHighlighted || undefined}
          data-focus={isFocused || undefined}
        />
      </Box>
    );
  }
);

CreatableOption.displayName = 'BaseSelect.CreatableOption';
