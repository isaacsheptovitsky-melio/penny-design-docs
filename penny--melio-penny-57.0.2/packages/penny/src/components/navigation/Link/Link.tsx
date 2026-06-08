import { Box } from '@chakra-ui/react';
import { useHasOverflow, useTestId } from '@melio/penny-utils';
import { forwardRef, useRef } from 'react';

import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils';
import { useStyleConfig } from '@/theme/hooks/use-style-config';
import { disabledLinkAttributes } from '@/utils/disabledLinkAttributes';
import { mergeRefs } from '@/utils/merge-refs';

import type { LinkProps } from './Link.types';

/**
 * A Link component that provides navigation to other pages or external resources.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      label,
      variant = 'inline',
      size,
      newTab,
      shouldSupportEllipsis,
      color,
      isDisabled,
      'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.LINK,
      isBold,
      ...props
    },
    propRef
  ) => {
    const styles = useStyleConfig('Link', {
      variant,
      size: variant === 'standalone' ? (size ?? 'large') : undefined,
      shouldSupportEllipsis,
      color,
      isBold,
    });
    const linkRef = useRef<HTMLAnchorElement>(null);
    const ref = mergeRefs([linkRef, propRef]);
    const getTestId = useTestId(dataTestId);

    const { hasOverflowX } = useHasOverflow(linkRef);

    const showTooltip = !!shouldSupportEllipsis && hasOverflowX;

    return (
      <Tooltip content={label} isEnabled={showTooltip}>
        <Box
          __css={styles}
          as="a"
          data-component="Link"
          target={newTab ? '_blank' : '_self'}
          {...props}
          {...(isDisabled && disabledLinkAttributes)}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={ref}
          {...getTestId()}
        >
          {label}
        </Box>
      </Tooltip>
    );
  }
);

Link.displayName = 'Link';
