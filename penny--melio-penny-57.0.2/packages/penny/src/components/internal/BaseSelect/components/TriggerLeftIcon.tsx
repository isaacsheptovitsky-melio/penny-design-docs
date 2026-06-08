import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '../../../../theme/hooks/use-style-config';
import { Icon, type IconProps } from '../../../foundations/Icon';

type TriggerLeftIconProps = Pick<IconProps, 'type' | 'size' | 'isDisabled' | 'isReadOnly'> & {
  isViewMode?: boolean;
};

export const TriggerLeftIcon = forwardRef<HTMLDivElement, TriggerLeftIconProps>(
  ({ type, size, isDisabled, isReadOnly, isViewMode, ...props }, ref) => {
    const styles = useMultiStyleConfig('BaseSelect', {});
    const getTestId = useTestId('base-select');

    return (
      <Box
        data-component="BaseSelect.TriggerLeftIcon"
        ref={ref}
        as="span"
        __css={styles['triggerLeftIcon']}
        /* set the correct color for read-only state. */
        data-view-mode={isViewMode || undefined}
        data-disabled={isDisabled || isReadOnly || undefined}
        {...getTestId('trigger-left-icon')}
        {...props}
      >
        <Icon size="small" type={type} color="inherit" />
      </Box>
    );
  }
);

TriggerLeftIcon.displayName = 'BaseSelect.TriggerLeftIcon';
