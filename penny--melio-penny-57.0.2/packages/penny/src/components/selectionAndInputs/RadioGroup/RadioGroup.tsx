import { Box } from '@chakra-ui/react';
import { uniqueId, useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Typography } from '@/components/dataDisplay/typography';
import { useStyleConfig } from '@/theme/hooks/use-style-config';
import { useBreakpointValue } from '@/theme/hooks/useBreakpointValue';

import { Radio } from '../Radio/Radio';
import { type RadioGroupProps } from './RadioGroup.types';

/**
 * The Radio Group component allows users to select a single option from a list. It follows standard radio button behavior but includes an option for customizable content.
 */
function checkAutoFocus(autoFocusAttribute: boolean, selectedValue: string | undefined, value: string, index: number) {
  if (!autoFocusAttribute) {
    return false;
  }

  if (selectedValue) {
    return value === selectedValue;
  }

  return index === 0;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      onChange,
      isReadOnly,
      isViewMode,
      isDisabled,
      value,
      options,
      isInvalid,
      name,
      variant,
      size,
      id,
      autoFocus,
      'aria-describedby': ariaDescribedby,
      'data-testid': dataTestId = 'radio-group',
      ...props
    },
    ref
  ) => {
    const getTestId = useTestId(dataTestId);
    // When the variant is not explicit, we set the default behavior.
    const dynamicVariant = useBreakpointValue<RadioGroupProps['variant']>({ xs: 'vertical', s: 'horizontal' });

    const styles = useStyleConfig('RadioGroup', { variant: variant ?? dynamicVariant });

    if (isViewMode) {
      const optionToDisplay = options.find((o) => o.value === value);
      const displayValue = optionToDisplay?.mainLabelProps?.label ?? '';
      return (
        <Typography.MainLabel
          data-view-mode
          {...getTestId()}
          size={size}
          label={displayValue}
          placeholder={props.placeholder}
        />
      );
    }

    return (
      <Box
        data-component="RadioGroup"
        ref={ref}
        role="radiogroup"
        {...props}
        {...getTestId()}
        {...{ name, id }}
        aria-disabled={isDisabled}
        data-invalid={isInvalid || null}
        __css={styles}
      >
        {options.map(({ disabled, id: optionId, ...option }, index) => (
          <Radio
            {...option}
            key={option.value}
            value={option.value}
            disabled={disabled ?? isDisabled}
            onChange={onChange}
            isChecked={option.value === value}
            isInvalid={isInvalid}
            isReadOnly={option.isReadOnly || isReadOnly}
            name={name}
            id={optionId ?? uniqueId(`${id ?? 'radio-group'}_`)}
            {...getTestId(option.value)}
            autoFocus={checkAutoFocus(!!autoFocus, value, option.value, index)}
            aria-describedby={ariaDescribedby}
          />
        ))}
      </Box>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
