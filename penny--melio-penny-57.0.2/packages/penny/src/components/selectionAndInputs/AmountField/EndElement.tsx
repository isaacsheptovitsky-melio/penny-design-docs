import { Box, type BoxProps } from '@chakra-ui/react';
import { forwardRef, type MouseEventHandler, type PropsWithChildren } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

export type AmountFieldEndElementProps = PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLDivElement>;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}>;

export const AmountFieldEndElement = forwardRef<HTMLDivElement, AmountFieldEndElementProps>(
  ({ isDisabled, isReadOnly, onClick, ...props }, ref) => {
    const style = useStyleConfig('AmountField', props);

    const elementProps: Partial<BoxProps> & { type?: 'button' } = onClick
      ? {
          as: 'button',
          type: 'button',
          onClick: isDisabled || isReadOnly ? undefined : onClick,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          disabled: isDisabled,
          readOnly: isReadOnly,
        }
      : {
          as: 'div',
          'data-disabled': isDisabled || undefined,
          'data-readonly': isReadOnly || undefined,
        };

    return <Box data-component="AmountFieldEndElement" {...elementProps} ref={ref} {...props} __css={style} />;
  }
);

AmountFieldEndElement.displayName = 'AmountFieldEndElement';
