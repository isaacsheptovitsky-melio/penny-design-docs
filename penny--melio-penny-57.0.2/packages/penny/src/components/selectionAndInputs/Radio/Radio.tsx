import { Box } from '@chakra-ui/react';
import { uniqueId, useTestId } from '@melio/penny-utils';
import { type ChangeEvent, forwardRef, useMemo } from 'react';

import { Group } from '@/components/containers/Group';
import { Typography } from '@/components/dataDisplay/typography';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { getAriaProps, getInteractiveElementProps } from '@/utils';

import { type RadioProps } from './Radio.types';

/**
 * A radio button component that allows users to select one option from a group.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      onChange,
      mainLabelProps,
      value,
      isChecked,
      isInvalid,
      isReadOnly,
      descriptionProps,
      disabled,
      ariaLabel,
      ariaLabelledby,
      'aria-describedby': ariaDescribedBy,
      'data-testid': dataTestId = 'radio',
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('Radio', props);
    const getTestId = useTestId(dataTestId);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!disabled && !isReadOnly) {
        onChange?.(event);
      }
    };

    const hasDescription = descriptionProps?.label;

    const descriptionId = useMemo(() => uniqueId('radio-description-'), []);

    const radioAriaDescribedby = useMemo(
      () =>
        getAriaProps('aria-describedby', [
          (hasDescription && (descriptionProps?.id ?? descriptionId)) ?? undefined,
          ariaDescribedBy,
        ]),
      [ariaDescribedBy, descriptionId, descriptionProps, hasDescription]
    );

    const interactiveRadioProps = getInteractiveElementProps({
      isDisabled: disabled,
    });

    const radioInputComponent = (
      <Box
        __css={styles['radio']}
        as="input"
        // ts-ignore is used due to `type` issues with `<Box/>`.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        type="radio"
        value={value}
        onChange={handleChange}
        checked={isChecked}
        aria-checked={isChecked}
        data-readonly={isReadOnly || undefined}
        aria-invalid={isInvalid}
        aria-label={ariaLabel ?? mainLabelProps?.label}
        aria-labelledby={ariaLabelledby}
        {...interactiveRadioProps}
        {...radioAriaDescribedby}
        {...props}
        {...getTestId('input')}
      />
    );

    const mainLabelComponent = mainLabelProps && (
      <Typography.MainLabel
        {...mainLabelProps}
        isReadOnly={isReadOnly}
        variant={hasDescription ? 'bold' : 'default'}
        isDisabled={disabled}
      />
    );

    const descriptionComponent = descriptionProps && (
      <Box __css={styles['description']}>
        <Typography.Description
          {...descriptionProps}
          isReadOnly={isReadOnly}
          isDisabled={disabled}
          id={descriptionProps.id ?? descriptionId}
        />
      </Box>
    );

    const radioContent = label ? (
      <Box
        as="label"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        htmlFor={props.id}
        __css={styles['label']}
        data-disabled={disabled || undefined}
        data-readonly={isReadOnly || undefined}
      >
        {label}
      </Box>
    ) : (
      <Group variant="vertical" spacing="xxxs">
        <Box
          as="label"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          htmlFor={props.id}
          __css={styles['label']}
          aria-disabled={disabled}
        >
          {mainLabelComponent}
        </Box>
        {descriptionComponent}
      </Group>
    );

    return (
      <Group
        data-component="Radio"
        ref={ref}
        variant="horizontal"
        alignItems="baseline"
        width="fit-content"
        spacing="none"
        {...getTestId()}
      >
        {radioInputComponent}
        {radioContent}
      </Group>
    );
  }
);

Radio.displayName = 'Radio';
