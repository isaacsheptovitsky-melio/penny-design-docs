import { Box, useFormControlContext } from '@chakra-ui/react';
import { type AriaAttributes, type FC, forwardRef, type ReactNode, useMemo } from 'react';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Typography, type TypographyLabelProps } from '@/components/dataDisplay/typography';
import { type CommonInputProps } from '@/components/form/components/Form/inputs/types';
import { getAriaDescribedByProps } from '@/components/form/utils/getAriaDescribedByProps';
import { type FormSize } from '@/theme/utils/form.utils';
import { getAutoCompleteProps } from '@/utils/form-field-utils';
import { drillProps } from '@/utils/render-utils';
import { useLiveRegionActivation } from '@/utils/useLiveRegionActivation';

import { ConditionalWrapper } from '../ConditionalWrapper';
import { FormControl } from '../FormControl';
import { FormControlContext } from '../FormControl/FormControlContext';

/**
 * @private For internal use only.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _FormFieldProps = {
  error?: { message?: string };
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isViewMode?: boolean;
  isLoading?: boolean;
  viewModePlaceholder?: string;
  isHidden?: boolean;
  isRequired?: boolean;
  showOptionalIndicator?: boolean;
  name?: string;
  size?: FormSize;
  columns?: number;
  colSpan?: number;
  children?: ReactNode;
  helperTextProps?: { label: string | ReactNode };
  maxChars?: number;
  value?: unknown;
  labelProps?: Omit<TypographyLabelProps, 'isInvalid' | 'isDisabled' | 'isReadOnly' | 'isViewMode'>;
} & Pick<CommonInputProps, 'autoComplete' | 'id'> &
  AriaAttributes;

const InputComp: FC<{ children: ReactNode }> = ({ children, ...props }) => {
  const context = useFormControlContext();

  return <>{drillProps(children, { isInvalid: context?.isInvalid, ...props })}</>;
};

/**
 * @private For internal use only.
 */
export const _FormField = forwardRef<HTMLDivElement, _FormFieldProps>(
  (
    {
      error,
      labelProps,
      'aria-label': ariaLabel,
      helperTextProps,
      maxChars,
      isDisabled,
      isReadOnly,
      isViewMode,
      size,
      name,
      colSpan = 1,
      columns = 1,
      isRequired,
      showOptionalIndicator,
      children,
      id,
      value,
      autoComplete,
      ...props
    },
    ref
  ) => {
    const isInvalid = !!error;
    const getTestId = (prefix: string) => name && `${prefix}-${name}`;
    const charsOutOfMaxChars = maxChars && `${(value as string)?.length ?? '0'}/${maxChars}`;

    const autoCompleteProps = useMemo(() => getAutoCompleteProps({ name, autoComplete }), [name, autoComplete]);

    const { helperTextId, errorMessageId, maxCharsId, ...fieldAriaDescribedby } = getAriaDescribedByProps({
      id,
      error,
      helperText: helperTextProps?.label,
      maxChars,
    });

    const showHelperTextContainer = isInvalid || (helperTextProps?.label && !isViewMode) || !!maxChars;
    const formFieldGroupSpacing = showHelperTextContainer ? 'xs' : 'none';

    const { handleOnKeyDown, setIsFocusedWithin, isAriaRegionActive, announceKey } = useLiveRegionActivation(
      error?.message
    );

    return (
      <FormControlContext.Provider value={{ maxChars, isInvalid }}>
        <FormControl
          gridColumn={{ xs: '1 / 1', s: `span ${colSpan} / span ${columns}` }}
          // `minWidth` is necessary to support text-ellipsis in descendant elements
          minWidth={0}
          size={size}
          isInvalid={isInvalid}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isViewMode={isViewMode}
          data-testid={getTestId('form-field')}
          data-component="_FormField"
          id={id}
          {...props}
          ref={ref}
          onFocus={() => {
            setIsFocusedWithin(true);
          }}
          onBlur={() => {
            setIsFocusedWithin(false);
          }}
          onKeyDown={handleOnKeyDown}
        >
          {labelProps && (
            <Typography.Label
              as={isViewMode ? 'div' : 'label'}
              data-testid={getTestId('form-label')}
              isInvalid={isInvalid}
              isReadOnly={isReadOnly}
              isViewMode={isViewMode}
              isDisabled={isDisabled}
              description={isViewMode ? undefined : isRequired ? '*' : showOptionalIndicator ? '(optional)' : undefined}
              htmlFor={isViewMode ? undefined : id}
              id={`${id}-label`}
              {...labelProps}
            />
          )}
          <Group spacing={formFieldGroupSpacing} variant="vertical">
            <InputComp
              {...autoCompleteProps}
              aria-label={ariaLabel}
              aria-required={!isViewMode && isRequired}
              {...fieldAriaDescribedby}
            >
              {children}
            </InputComp>
            <Group justifyContent={!!error || (helperTextProps?.label && !isViewMode) ? 'space-between' : 'flex-end'}>
              <ConditionalWrapper
                condition={isAriaRegionActive}
                wrapper={(children) => (
                  <Box display="inline-flex" key={`${errorMessageId}-error-${announceKey}`} role="alert">
                    {children}
                  </Box>
                )}
              >
                {error?.message && (
                  <Text
                    textStyle="body4"
                    color="semantic.text.critical.rest"
                    id={errorMessageId}
                    data-testid={getTestId('form-error-message')}
                  >
                    {error?.message}
                  </Text>
                )}
              </ConditionalWrapper>
              {!error?.message && helperTextProps?.label && !isViewMode && (
                <Text
                  data-testid={getTestId('form-helper-text')}
                  id={helperTextId}
                  textStyle="body4"
                  color={isDisabled ? 'semantic.text.disabled' : 'semantic.text.secondary'}
                  aria-disabled={isDisabled}
                >
                  {helperTextProps.label}
                </Text>
              )}
              {charsOutOfMaxChars && (
                <Text
                  textStyle="body4"
                  color={
                    isInvalid
                      ? 'semantic.text.critical.rest'
                      : isDisabled
                        ? 'semantic.text.disabled'
                        : 'semantic.text.secondary'
                  }
                  data-testid="max-chars"
                  id={maxCharsId}
                >
                  {charsOutOfMaxChars}
                </Text>
              )}
            </Group>
          </Group>
        </FormControl>
      </FormControlContext.Provider>
    );
  }
);

_FormField.displayName = '_FormField';
