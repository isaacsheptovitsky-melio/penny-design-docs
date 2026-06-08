import { Box, InputGroup } from '@chakra-ui/react';
import { uniqueId, useTestId } from '@melio/penny-utils';
import { type ForwardedRef, forwardRef, type NamedExoticComponent, type Ref, useMemo, useState } from 'react';

import { Group } from '@/components/containers/Group';
import { Typography } from '@/components/dataDisplay/typography';
import { Loader } from '@/components/foundations/Loader';
import { useFormControlContext } from '@/components/internal/FormControl';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { getAriaProps } from '@/utils/getAriaProps';

import { Checkbox, type CheckboxProps } from '../Checkbox';
import { type BaseTextAreaProps, type TextAreaProps, type TextAreaValidateProps } from './TextArea.types';

/**
 * The Text Area component is a multi-line text input, allowing users to enter longer content such as descriptions, messages, or comments.
 */
const TextAreaComponent = (
  {
    isEditable = true,
    isLoading,
    placeholder,
    footer,
    isReadOnly,
    isDisabled,
    isInvalid,
    isViewMode,
    value,
    numberOfRows,
    maxChars: maxCharsProp,
    'data-testid': dataTestId = 'text-area-input',
    onChange,
    ...props
  }: TextAreaProps,
  ref: Ref<HTMLInputElement>
) => {
  const isFocusable = !isDisabled && isEditable;
  const [isInputFocus, setInputFocus] = useState<boolean>(false);
  const style = useMultiStyleConfig('TextArea', {});
  const { maxChars } = useFormControlContext();

  const getTestId = useTestId(dataTestId);

  const loaderId = useMemo(() => uniqueId('loader-'), []);
  const ariaDescribedby = getAriaProps('aria-describedby', [
    props['aria-describedby'],
    isLoading ? loaderId : undefined,
  ]);

  if (isViewMode) {
    return (
      <Typography.MainLabel
        ref={ref}
        {...getTestId()}
        data-view-mode
        label={value?.toString?.()}
        placeholder={placeholder}
        shouldSupportEllipsis={false}
      />
    );
  }

  return (
    <InputGroup
      __css={style['container']}
      aria-disabled={isDisabled}
      data-editable={isEditable}
      data-readonly={isReadOnly || isLoading}
      data-loading={isLoading || undefined}
      aria-invalid={isInvalid}
      data-focus={(isFocusable && isInputFocus) || undefined}
      onFocus={() => setInputFocus(true)}
      onBlur={() => setInputFocus(false)}
      onMouseDown={!isFocusable ? (e) => e.preventDefault() : undefined}
    >
      <Group spacing="none" hasDivider variant="vertical">
        <Group width="full" spacing="xs" alignItems="center">
          <Box
            as="textarea"
            data-component="TextArea"
            aria-label="text area input"
            {...getTestId()}
            data-loading={isLoading || undefined}
            placeholder={placeholder}
            sx={style['field']}
            data-editable={isEditable}
            aria-disabled={isDisabled}
            aria-readonly={isReadOnly}
            aria-invalid={isInvalid}
            disabled={isDisabled}
            readOnly={isReadOnly || isLoading}
            value={value}
            {...(isEditable && { ...props, onChange })}
            {...ariaDescribedby}
            rows={numberOfRows || 4}
            maxLength={maxCharsProp ?? maxChars}
            ref={ref}
          />
          {isLoading && (
            <Box __css={style['loaderContainer']}>
              <Loader id={loaderId} />
            </Box>
          )}
        </Group>

        {footer && !isEditable && (
          <Box __css={style['footerContainer']}>
            <Checkbox {...(!isEditable && { ...props, onChange: onChange as CheckboxProps['onChange'] })} {...footer} />
          </Box>
        )}
      </Group>
    </InputGroup>
  );
};
export const TextArea = forwardRef(TextAreaComponent) as <T extends BaseTextAreaProps>(
  props: TextAreaValidateProps<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof TextAreaComponent>;

(TextArea as NamedExoticComponent).displayName = 'TextArea';
