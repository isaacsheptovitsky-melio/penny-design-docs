import { Box, type BoxProps } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { type ButtonSizes, type ButtonVariants } from '@/components/action/Button/Button.types';
import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { ButtonGroupProvider } from './ButtonGroupContext';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface ButtonGroupProps extends BoxProps, TestIdProp {
  /**
   * Whether all the buttons in the group are loading
   * @default false
   */
  isLoading?: boolean;
  /**
   * Whether all the buttons in the group are disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * The size of all the buttons in the group
   * @default 'medium'
   */
  size?: ButtonSizes;
  /**
   * The variant of all the buttons in the group
   * @default 'primary'
   */
  variant?: ButtonVariants;
}

/**
 * A container that groups related buttons together with consistent styling and state.
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(props, ref) {
  const {
    children,
    size = 'medium',
    variant = 'primary',
    isLoading = false,
    isDisabled = false,
    'data-testid': dataTestId = 'button-group',
    ...rest
  } = props;

  const styles = useStyleConfig('ButtonGroup');

  return (
    <Box ref={ref} role="group" data-component="ButtonGroup" data-testid={dataTestId} {...rest} __css={styles}>
      <ButtonGroupProvider variant={variant} size={size} isLoading={isLoading} isDisabled={isDisabled}>
        {children}
      </ButtonGroupProvider>
    </Box>
  );
});

ButtonGroup.displayName = 'ButtonGroup';
