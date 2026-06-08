import { Box } from '@chakra-ui/react';
import { isMobileAndroid, isWindowsOS, uniqueId, useTestId } from '@melio/penny-utils';
import { type ForwardedRef, forwardRef, useMemo } from 'react';

import { useButtonGroupContext } from '@/components/action/ButtonGroup/ButtonGroupContext';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Loader } from '@/components/foundations/Loader';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { getAriaProps } from '@/utils/getAriaProps';

import { getButtonLinkProps } from '../utils/getButtonLinkProps';
import type { ButtonProps } from './Button.types';
import { DEFAULT_DATA_TEST_ID, DEFAULT_VARIANT, loaderColorMap } from './button.utils';

/**
 * The Button component is used to trigger actions or events, such as form submissions and navigation.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    leftElement,
    rightElement,
    label,
    isDisabled: isDisabledProp,
    isLoading: isLoadingProp,
    variant: variantProp,
    isFullWidth,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    children,
    link,
    loadingText,
    hideLoadingText,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    size: sizeProp,
    'data-testid': dataTestId = DEFAULT_DATA_TEST_ID,
    ...otherProps
  } = props;

  const btnGroupContext = useButtonGroupContext();
  const isLoading = isLoadingProp ?? btnGroupContext?.isLoading ?? false;
  const isDisabled = isDisabledProp ?? btnGroupContext?.isDisabled ?? false;
  const variant = variantProp ?? btnGroupContext?.variant ?? DEFAULT_VARIANT;
  const size = sizeProp ?? btnGroupContext?.size ?? 'medium';

  const getTestId = useTestId(dataTestId);

  const styles = useMultiStyleConfig('Button', { isLoading, isFullWidth, size, variant });
  const loaderId = useMemo(() => uniqueId('loader-'), []);
  const allAriaLabelledby = getAriaProps('aria-labelledby', [isLoading ? loaderId : undefined, ariaLabelledby]);
  const buttonAsLinkProps = getButtonLinkProps({ link, isDisabled: isDisabled || isLoading });

  return (
    <Box
      data-component="Button"
      as="button"
      type="button"
      aria-label={!isLoading ? ariaLabel : undefined}
      __css={styles['container']}
      {...allAriaLabelledby}
      {...buttonAsLinkProps}
      {...(!link && { disabled: isDisabled })}
      {...otherProps}
      data-loading={isLoading || null}
      ref={ref as ForwardedRef<HTMLDivElement>}
      {...getTestId()}
    >
      <Box as="span" __css={styles['label']}>
        <Group spacing="xs" alignItems="center" justifyContent="center">
          {leftElement}
          <Text color="inherit" textStyle={size === 'large' ? 'body2Semi' : 'body3Semi'}>
            {label}
          </Text>
          {rightElement}
        </Group>
      </Box>
      {isLoading && (
        <Box as="span" __css={styles['loader']}>
          <Loader
            id={loaderId}
            color={loaderColorMap[variant]}
            loadingText={loadingText}
            hideLoadingText={hideLoadingText}
            {...(isMobileAndroid() || isWindowsOS() ? { 'aria-live': 'polite' } : undefined)}
          />
        </Box>
      )}
    </Box>
  );
});

Button.displayName = 'Button';
