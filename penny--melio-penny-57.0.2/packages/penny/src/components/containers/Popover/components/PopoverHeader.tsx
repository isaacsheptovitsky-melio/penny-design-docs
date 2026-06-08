import { Box } from '@chakra-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { BasePopoverHeader } from '@/components/containers/BasePopover';
import { Icon, type IconProps } from '@/components/foundations/Icon';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

export type PopoverHeaderProps = {
  title?: string;
  icon?: IconProps['type'];
} & TestIdProp;

export const PopoverHeader = forwardRef<HTMLDivElement, PopoverHeaderProps>(
  ({ icon, title, 'data-testid': dataTestId = 'popover-header', ...props }, ref) => {
    const styles = useMultiStyleConfig('Popover', {});
    const getTestId = useTestId(dataTestId);

    return (
      <BasePopoverHeader data-component="PopoverHeader" {...getTestId()} {...props} ref={ref} as="h2">
        {icon && (
          <Box as="span" __css={styles['icon']}>
            <Icon type={icon} size="small" color="inverse" />
          </Box>
        )}
        {title && (
          <Box as="span" __css={styles['title']}>
            {title}
          </Box>
        )}
      </BasePopoverHeader>
    );
  }
);

PopoverHeader.displayName = 'PopoverHeader';
