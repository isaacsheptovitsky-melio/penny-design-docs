import { Box } from '@chakra-ui/react';
import { uniqueId, useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type HiddenOptionInputProps } from './HiddenOptionInput.types';

export const HIDDEN_OPTION_INPUT_DEFAULT_TEST_ID = 'hidden-option-input';

export const HiddenOptionInput = forwardRef<HTMLInputElement, HiddenOptionInputProps>(
  (
    {
      selected,
      readOnly,
      type = 'radio',
      'data-testid': dataTestId = HIDDEN_OPTION_INPUT_DEFAULT_TEST_ID,
      children,
      ...props
    }: HiddenOptionInputProps,
    ref
  ) => {
    const styles = useMultiStyleConfig('HiddenOptionInput', {});
    const getTestId = useTestId(dataTestId);
    const id = props.id ?? uniqueId();

    return (
      <Box data-component="HiddenOptionInput" __css={styles['container']} {...getTestId()}>
        <Box
          {...getTestId('input')}
          as="input"
          ref={ref}
          checked={selected}
          data-readonly={readOnly || undefined}
          __css={styles['input']}
          type={type}
          readOnly={readOnly}
          id={id}
          {...props}
        />

        <Box as="label" {...getTestId('label')} htmlFor={id}>
          {children}
        </Box>
      </Box>
    );
  }
);

HiddenOptionInput.displayName = 'HiddenOptionInput';
