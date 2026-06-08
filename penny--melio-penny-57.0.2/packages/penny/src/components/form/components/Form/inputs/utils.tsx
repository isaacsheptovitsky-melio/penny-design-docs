import { type ComponentProps, type ComponentRef, forwardRef, type ForwardRefExoticComponent, useRef } from 'react';
import { useController } from 'react-hook-form';

import { useFormContext } from '@/components/internal/_Form';
import { _FormField as FormField, type _FormFieldProps } from '@/components/internal/_FormField';
import { mergeRefs } from '@/utils/merge-refs';

import type { DeprecatedFormFieldProps } from './types';

/**
 * @private Please use `Form.<component-name>` from `@melio/penny`. do not use this function directly
 */
export function createFormFieldInput<P>(Comp: ForwardRefExoticComponent<P>) {
  const TargetComponent = forwardRef<ComponentRef<typeof Comp>, DeprecatedFormFieldProps<P>>(
    (
      {
        labelProps,
        'aria-label': ariaLabel,
        colSpan,
        error,
        helperTextProps,
        maxChars,
        isDisabled,
        isReadOnly,
        isViewMode,
        isRequired,
        showOptionalIndicator,
        isHidden,
        size,
        name,
        id,
        control,
        viewModePlaceholder,
        autoComplete: overrideAutoComplete,
        ...inputProps
      },
      ref
    ) => {
      // Handle PhoneField default autoComplete since it uses default parameters instead of defaultProps
      const componentDefaultAutoComplete = Comp.displayName === 'PhoneField' ? 'tel' : undefined;
      const autoComplete = overrideAutoComplete ?? componentDefaultAutoComplete ?? 'off';
      const inputRef = useRef<HTMLInputElement>(null);

      const formFieldProps: _FormFieldProps = {
        // Manually focus the field when the label is clicked in case it's a non-semantic form element.
        labelProps: labelProps && { ...labelProps, onClick: () => inputRef.current?.focus() },
        'aria-label': ariaLabel,
        colSpan,
        error,
        helperTextProps,
        maxChars,
        isReadOnly,
        isViewMode,
        isRequired,
        showOptionalIndicator,
        isHidden,
        name,
        id,
        autoComplete,
      };
      const { field } = useController({ name, control });
      const formContext = useFormContext();
      const isFieldDisabled = formContext.isDisabled || isDisabled;
      const isFieldReadOnly = formContext.isReadOnly || isReadOnly || formContext.isLoading;
      const isFieldInViewMode = formContext.isViewMode || isViewMode;
      const fieldSize = size ?? formContext.size;

      return (
        <FormField
          {...formFieldProps}
          size={fieldSize}
          isDisabled={isFieldDisabled}
          isReadOnly={isFieldReadOnly}
          isViewMode={isFieldInViewMode}
          columns={formContext.columns}
          value={field.value as unknown}
        >
          <Comp
            {...field}
            data-testid={name && `form-input-${name}`}
            {...(inputProps as ComponentProps<typeof Comp>)}
            id={id}
            placeholder={isFieldInViewMode ? viewModePlaceholder : inputProps.placeholder}
            isDisabled={isFieldDisabled}
            isReadOnly={isFieldReadOnly}
            isViewMode={isFieldInViewMode}
            size={fieldSize}
            ref={mergeRefs([field.ref, ref, inputRef as never])}
          />
        </FormField>
      );
    }
  );

  if (Comp.displayName) {
    TargetComponent.displayName = `Form.${Comp.displayName.slice(1)}`;
  }

  return TargetComponent;
}
