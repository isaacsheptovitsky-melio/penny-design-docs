import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import { useButtonGroupContext } from '@/components/action/ButtonGroup/ButtonGroupContext';
import { Icon } from '@/components/foundations/Icon';
import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { getButtonLinkProps } from '../utils/getButtonLinkProps';
import type { IconButtonProps } from './IconButton.types';
import { DEFAULT_DATA_TEST_ID, DEFAULT_VARIANT, iconSizeMap } from './IconButton.utils';

/**
 * The IconButton is a compact button that displays only an icon, without a text label. It is typically used for less prominent actions, such as editing, deleting, or closing.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const {
    icon,
    size: sizeProp,
    isDisabled: isDisabledProp,
    isLoading: isLoadingProp,
    link,
    variant: variantProp,
    'data-testid': dataTestId = DEFAULT_DATA_TEST_ID,
    ...rest
  } = props;

  const btnGroupContext = useButtonGroupContext();
  const isLoading = isLoadingProp ?? btnGroupContext?.isLoading ?? false;
  const isDisabled = isDisabledProp ?? btnGroupContext?.isDisabled ?? false;
  const variant = variantProp ?? btnGroupContext?.variant ?? DEFAULT_VARIANT;
  const size = sizeProp ?? btnGroupContext?.size ?? 'medium';

  const styles = useStyleConfig('IconButton', { size, variant });

  const buttonAsLinkProps = getButtonLinkProps({ link, isDisabled });
  const getTestId = useTestId(dataTestId);

  return (
    <Box
      data-component="IconButton"
      as="button"
      type="button"
      {...buttonAsLinkProps}
      {...(!link && { disabled: isDisabled })}
      {...rest}
      data-loading={isLoading || undefined}
      __css={styles}
      ref={ref as ForwardedRef<HTMLDivElement>}
      {...getTestId()}
    >
      <Icon type={icon} size={iconSizeMap[size]} color="inherit" aria-hidden />
    </Box>
  );
});

IconButton.displayName = 'IconButton';
