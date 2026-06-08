import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef, type MouseEvent, type MouseEventHandler } from 'react';

import { useMultiStyleConfig } from '../../../../theme/hooks/use-style-config';
import { Icon, type IconProps } from '../../../foundations/Icon';

type TriggerRightIconProps = Pick<IconProps, 'isDisabled' | 'isReadOnly'> & { icon: IconProps['type'] } & {
  isViewMode?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const TriggerRightIcon = forwardRef<HTMLButtonElement, TriggerRightIconProps>(
  ({ icon, isDisabled, isReadOnly, isViewMode, onClick, ...props }, ref) => {
    const styles = useMultiStyleConfig('BaseSelect', {});
    const getTestId = useTestId('base-select');

    return (
      <Box
        data-component="BaseSelect.TriggerRightIcon"
        ref={ref}
        // Using `as` causes some typing errors, so we disable them.
        as="button"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore -- `type` is a valid button prop.
        type="button"
        __css={styles['triggerRightIcon']}
        disabled={isDisabled || isReadOnly}
        data-view-mode={isViewMode || undefined}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore -- The event is for a `button` and not a `div`.
          onClick?.(e);
        }}
        {...getTestId('trigger-right-icon')}
        {...props}
      >
        <Icon size="small" type={icon} color="inherit" aria-hidden />
      </Box>
    );
  }
);

TriggerRightIcon.displayName = 'BaseSelect.TriggerRightIcon';
