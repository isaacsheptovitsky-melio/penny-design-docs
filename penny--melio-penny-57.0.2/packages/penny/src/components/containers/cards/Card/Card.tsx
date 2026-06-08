import { Box, type BoxProps } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef, type MouseEvent } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { CardProps } from './Card.types';

export const cardDefaultProps: Pick<CardProps, 'variant' | 'paddingX' | 'paddingY' | 'width'> = {
  variant: 'default',
  paddingX: 'm',
  paddingY: 'm',
  width: 'full',
};

/**
 * The Card component serves as a versatile container for grouping content and actions,
 * allowing users to engage with and access information more effectively.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      onClick,
      disabled,
      readOnly,
      variant = cardDefaultProps.variant,
      paddingX = cardDefaultProps.paddingX,
      paddingY = cardDefaultProps.paddingY,
      width = cardDefaultProps.width,
      children,
      'data-testid': dataTestId = 'card',
      ...otherProps
    },
    ref
  ) => {
    const getTestId = useTestId(dataTestId);
    const hasClickHandler = Boolean(onClick);
    const isClickable = hasClickHandler && !disabled && !readOnly;
    const styles = useMultiStyleConfig('Card', { paddingX, paddingY, width, variant });

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
      if (!isClickable) return;

      onClick?.(event);
    };

    const clickableProps: Partial<BoxProps> = onClick
      ? {
          as: 'button',
          // ts-ignore is used due to type issues with `Box`, `readOnly` needs to participate in the `disabled` for a11y purposes.
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          disabled: disabled || readOnly,
          ...(!disabled &&
            !readOnly && {
              'data-is-clickable': true,
              onClick: handleClick,
            }),
        }
      : {};

    return (
      <Box
        data-component="Card"
        ref={ref}
        __css={styles['container']}
        {...getTestId()}
        data-readonly={readOnly || null}
        data-disabled={disabled || null}
        {...clickableProps}
        {...otherProps}
      >
        {children}
      </Box>
    );
  }
);

Card.displayName = 'Card';
