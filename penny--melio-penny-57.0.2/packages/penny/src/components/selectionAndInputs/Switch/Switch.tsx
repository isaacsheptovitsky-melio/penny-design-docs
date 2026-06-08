import { Box } from '@chakra-ui/react';
import { uniqueId, useTestId } from '@melio/penny-utils';
import {
  type ChangeEvent,
  type ForwardedRef,
  forwardRef,
  type MouseEvent,
  type NamedExoticComponent,
  useState,
} from 'react';

import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { BaseSwitchProps, SwitchProps, SwitchValidateProps } from './Switch.types';

/**
 * The Switch (Toggle) component allows users to enable or disable a setting with a single tap or click.
 * It represents a binary state (on/off) and is commonly used for preferences, settings, and feature toggles.
 */
const SwitchComponent = (props: SwitchProps, ref: ForwardedRef<HTMLInputElement>) => {
  const {
    label,
    id,
    isDisabled,
    defaultIsChecked = false,
    value,
    onChange,
    size = 'large',
    isReadOnly,
    isFullWidth,
    'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.SWITCH,
    'aria-label': ariaLabel,
    ...rest
  } = props;
  const [isChecked, setIsChecked] = useState(defaultIsChecked);
  const inputId = uniqueId('switch_');
  const styles = useMultiStyleConfig('Switch', {
    size,
    isFullWidth,
  });

  const isCheckedValue = value ?? isChecked;
  const getTestId = useTestId(dataTestId);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly) return;
    setIsChecked(event.target.checked);
    onChange?.(event.target.checked);
  };

  return (
    <Box
      id={id}
      data-component="Switch"
      ref={ref}
      __css={styles['container']}
      aria-disabled={isDisabled}
      data-readonly={isReadOnly || undefined}
      as="label"
      // ts-ignore is used due to `type` issues with `<Box/>`.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      htmlFor={inputId}
      {...getTestId()}
    >
      {label && (
        <Box
          as="span"
          __css={styles['label']}
          data-disabled={isDisabled || undefined}
          data-readonly={isReadOnly || undefined}
          {...getTestId('label')}
        >
          {label}
        </Box>
      )}
      <Box __css={styles['track']} {...getTestId('track')}>
        <Box
          as="input"
          type="checkbox"
          onChange={handleChange}
          onClick={(event: MouseEvent<HTMLInputElement>) => event.stopPropagation()}
          disabled={isDisabled}
          data-readonly={isReadOnly || undefined}
          role="switch"
          aria-label={ariaLabel ?? label ?? 'Switch'}
          aria-checked={isCheckedValue}
          checked={isCheckedValue}
          aria-readonly={isReadOnly}
          {...rest}
          {...getTestId('input')}
          id={inputId}
        />
        <Box
          as="span"
          __css={styles['thumb']}
          data-checked={isCheckedValue || undefined}
          data-disabled={isDisabled || undefined}
          data-readonly={isReadOnly || undefined}
          {...getTestId('thumb')}
        />
      </Box>
    </Box>
  );
};

export const Switch = forwardRef(SwitchComponent) as <T extends BaseSwitchProps>(
  props: SwitchValidateProps<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof SwitchComponent>;

(Switch as NamedExoticComponent).displayName = 'Switch';
