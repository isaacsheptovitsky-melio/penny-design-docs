import { Box } from '@chakra-ui/react';
import { useId } from '@floating-ui/react';
import { isEmpty, useTestId } from '@melio/penny-utils';
import { forwardRef, type ReactNode, useRef, useState } from 'react';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { Group } from '@/components/containers/Group';
import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { getAriaProps, mergeRefs } from '@/utils';

import { type CheckboxProps } from './Checkbox.types';
import { CheckboxInput } from './CheckboxInput';

/**
 * Checkboxes are most commonly used to give users a way to make a range of selections (zero, one, or multiple).
 */
export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      size = 'large',
      label,
      isDisabled,
      onChange,
      isChecked,
      value,
      isIndeterminate,
      isReadOnly,
      isInvalid,
      tooltipProps,
      children,
      autoFocus,
      'aria-label': ariaLabel,
      'aria-required': ariaRequired,
      'aria-describedby': ariaDescribedby,
      'aria-labelledby': ariaLabelledby,
      'aria-controls': ariaControls,
      id,
      'data-testid': dataTestId = 'checkbox',
      ...rest
    },
    propRef
  ) => {
    const styles = useMultiStyleConfig('Checkbox', { size });
    const getTestId = useTestId(dataTestId);
    const checkboxInputRef = useRef<HTMLDivElement>(null);
    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/refs
    const ref = mergeRefs([propRef, checkboxInputRef]);
    const labelId = useId();
    const labelText = children ?? label;
    const isTooltipEnabled = Boolean(tooltipProps && !isDisabled);

    const [isTooltipShow, setShowTooltip] = useState(false);

    const onTooltipOpenChange = (isOpen: boolean) => {
      if (!isTooltipEnabled) return;
      setShowTooltip(isOpen);
    };

    const labelComponent = labelText ? (
      <Box
        id={labelId}
        as="label"
        __css={styles['label']}
        data-disabled={isDisabled || undefined}
        data-readonly={isReadOnly || undefined}
        onMouseEnter={() => onTooltipOpenChange(true)}
        onMouseLeave={() => onTooltipOpenChange(false)}
        {...getTestId('label')}
      >
        {labelText}
      </Box>
    ) : null;
    const checkboxLabelledby = getAriaProps('aria-labelledby', [ariaLabelledby, labelText ? labelId : undefined]);
    const checkboxInputProps = {
      ref,
      id,
      value,
      isDisabled,
      isIndeterminate,
      isReadOnly,
      isInvalid,
      size,
      isChecked,
      onChange,
      autoFocus,
      hasLabel: Boolean(labelComponent),
      tooltipProps: tooltipProps && {
        isEnabled: isTooltipEnabled,
        isOpen: isTooltipShow,
        onOpenChange: onTooltipOpenChange,
        shouldAddTriggerFocus: tooltipProps?.shouldAddTriggerFocus,
        ...tooltipProps,
      },
      'aria-label': ariaLabel ?? (isEmpty(checkboxLabelledby) ? label : undefined),
      'aria-required': ariaRequired,
      'aria-describedby': ariaDescribedby,
      ...checkboxLabelledby,
      'aria-controls': ariaControls,
      ...getTestId('input'),
    };

    return (
      <Box
        data-component="Checkbox"
        __css={styles['container']}
        data-disabled={isDisabled || undefined}
        data-readonly={isReadOnly || undefined}
        onClick={(event) => {
          event.stopPropagation();
          checkboxInputRef.current?.click();
        }}
        {...getTestId()}
        {...rest}
      >
        <ConditionalWrapper
          condition={Boolean(labelComponent || ariaRequired)}
          wrapper={(children: ReactNode) => (
            <Group spacing="xs" alignItems="flex-start">
              {children}
            </Group>
          )}
        >
          <CheckboxInput {...checkboxInputProps} />
          {labelComponent}
          {ariaRequired && (
            <VisuallyHidden aria-hidden id="required-hidden">
              Required
            </VisuallyHidden>
          )}
        </ConditionalWrapper>
      </Box>
    );
  }
);
Checkbox.displayName = 'Checkbox';
