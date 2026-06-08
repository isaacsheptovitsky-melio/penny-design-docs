import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { getButtonLinkProps } from '@/components/action/utils/getButtonLinkProps';
import { useStyleConfig } from '@/theme/hooks/use-style-config';

import type { NavigationItemProps } from './NavigationItem.types';

/**
 * The Navigation Item component is a versatile component used for navigation purposes,
 * capable of rendering as either a link or a button. This flexibility allows it to be used
 * in various contexts within your application, such as navigation bars, action panels, or interactive lists.
 */
export const NavigationItem = forwardRef<HTMLButtonElement, NavigationItemProps>(
  (
    {
      link,
      as = 'button',
      isFullWidth = false,
      'data-testid': dataTestId = 'navigation-item',
      isSelected = false,
      ...props
    },
    ref
  ) => {
    const styles = useStyleConfig('NavigationItem', { isFullWidth });
    const itemAsLinkProps = getButtonLinkProps({ link });
    const getTestId = useTestId(dataTestId);

    return (
      <Box
        data-component="NavigationItem"
        as={as}
        type={as === 'button' ? 'button' : undefined}
        data-selected={isSelected || null}
        __css={styles}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={ref}
        {...itemAsLinkProps}
        {...getTestId()}
        {...props}
      />
    );
  }
);

NavigationItem.displayName = 'NavigationItem';
