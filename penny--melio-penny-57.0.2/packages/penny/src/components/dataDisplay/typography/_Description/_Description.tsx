import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { NakedButton } from '@/components/action/NakedButton';
import { Text } from '@/components/dataDisplay/Text';
import { Link } from '@/components/navigation/Link';
import { useStyleConfig } from '@/theme/hooks/use-style-config';

import type { _DescriptionProps } from './_Description.types';

/**
 * @private
 */
export const _Description = forwardRef<HTMLDivElement, _DescriptionProps>(
  ({ label, isDisabled, isInvalid, isReadOnly, action, link, ...props }, ref) => {
    const styles = useStyleConfig('_Description');
    const shouldDisplayCTA = !isDisabled && !isReadOnly;

    return (
      <Box
        ref={ref}
        data-component="_Description"
        __css={styles}
        aria-disabled={isDisabled || undefined}
        data-invalid={isInvalid || null}
        data-readonly={isReadOnly || null}
        {...props}
      >
        <Text textStyle="inline" color="inherit">
          {label}
        </Text>
        {link && shouldDisplayCTA && (
          <>
            {' '}
            <Link
              {...link}
              onClick={(e) => {
                e.stopPropagation();
                link.onClick?.(e);
              }}
            />
          </>
        )}
        {action && shouldDisplayCTA && (
          <>
            {' '}
            <NakedButton
              {...action}
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                action.onClick?.(e);
              }}
            />
          </>
        )}
      </Box>
    );
  }
);

_Description.displayName = '_Description';
