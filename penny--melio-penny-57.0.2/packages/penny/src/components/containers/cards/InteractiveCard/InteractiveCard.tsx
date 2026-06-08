import { Box, type BoxProps } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef, type MouseEvent } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { Card } from '../Card';
import { cardDefaultProps } from '../Card/Card';
import { type InteractiveCardProps } from './InteractiveCard.types';

/**
 * The `InteractiveCard` component is based on Card and extends its styles to reflect interaction states.
 */
export const InteractiveCard = forwardRef<HTMLDivElement, InteractiveCardProps>(
  (
    {
      onClick,
      selected,
      disabled = false,
      readOnly = false,
      variant = 'default',
      type = 'button',
      children,
      'data-testid': dataTestId = 'interactive-card',
      ...props
    },
    ref
  ) => {
    const getTestId = useTestId(dataTestId);
    const isClickable = Boolean(onClick) && !disabled && !readOnly;
    const styles = useMultiStyleConfig('InteractiveCard', { variant });

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
      if (!isClickable) return;

      onClick?.(event);
    };

    const clickableProps: Partial<BoxProps> = onClick
      ? ({
          as: 'button',
          type,
          // ts-ignore is used due to type issues with `Box`, `readOnly` needs to participate in the `disabled` for a11y purposes.
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          disabled: disabled || readOnly,
          ...(selected !== undefined && { 'aria-pressed': selected }),
          ...(!disabled &&
            !readOnly && {
              'data-is-interactive': true,
              'data-is-clickable': true,
              onClick: handleClick,
            }),
        } as Partial<BoxProps>)
      : {};

    return (
      <Box
        as={Card}
        data-component="InteractiveCard"
        ref={ref}
        {...getTestId()}
        __css={styles['container']}
        data-selected={selected || null}
        data-readonly={readOnly || null}
        data-disabled={disabled || null}
        {...clickableProps}
        {...cardDefaultProps}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

InteractiveCard.displayName = 'InteractiveCard';
