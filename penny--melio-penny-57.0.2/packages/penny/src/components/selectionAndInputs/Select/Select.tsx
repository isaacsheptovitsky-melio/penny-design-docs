import { isEqual } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { BaseSelect, type BaseSelectBaseProps } from '@/components/internal/BaseSelect';
import { useSelect } from '@/components/internal/BaseSelect/hooks/useSelect';
import { getOptionKey } from '@/components/internal/BaseSelect/hooks/utils';

import { type SelectProps, type SelectValue } from './Select.types';

/**
 * @deprecated Please use `SelectNew` instead.
 */

// eslint-disable-next-line @typescript-eslint/no-deprecated
export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      options,
      children,
      size = 'large',
      valueRightElement,
      emptyState,
      creatableOption,
      isDisabled = false,
      isReadOnly = false,
      isViewMode = false,
      isLoading = false,
      autoFocus = false,
      value,
      placeholder,
      onInputChange,
      onChange,
      formatSelectedValue,
      onClick,
      onKeyDown,
      onFocus,
      onBlur,
      onSearchTermReset,
      id,
      ...props
    },
    ref
  ) => {
    const filterOptions: BaseSelectBaseProps<SelectValue>['filterOptions'] = (options, searchTerm) =>
      searchTerm ? options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())) : options;

    const {
      anchorRef,
      isOpen,
      hasSections,
      getToggleButtonProps,
      inputValue,
      inputProps,
      dropdownMenuProps,
      getOptionProps,
      selectedOption,
      filteredOptions,
    } = useSelect({
      ref,
      value,
      formatSelectedValue,
      options,
      filterOptions,
      creatableOption,
      emptyState,
      disableInputClick: isDisabled || isLoading || isReadOnly,
      onClick,
      onChange,
      onInputChange,
      onKeyDown,
      onSearchTermReset,
    });

    const dropdownLabelProp = props['aria-label']
      ? // 'aria-labelledby': undefined will reset the default value from downshift
        { 'aria-label': props['aria-label'], 'aria-labelledby': undefined }
      : { 'aria-labelledby': `${id}-label` };

    const creatableOptionComponent = typeof creatableOption === 'object' && (
      <BaseSelect.CreatableOption
        message={typeof creatableOption.label === 'string' ? creatableOption.label : creatableOption.label(inputValue)}
        {...getOptionProps({
          option: { value: inputValue.toLocaleLowerCase(), label: inputValue },
          index: filteredOptions.length,
          isCreatableOption: true,
        })}
        key={getOptionKey(inputValue, filterOptions.length)}
      />
    );

    const sharedProps = {
      isDisabled,
      isViewMode,
      isReadOnly: isReadOnly || isLoading,
    };

    const rightElement = (
      <BaseSelect.TriggerRightIcon
        data-testid="select-toggle-button"
        aria-label="Toggle select dropdown menu"
        icon={isOpen ? 'caret-up' : 'caret-down'}
        {...sharedProps}
        {...(!isDisabled && !isReadOnly && !isLoading && getToggleButtonProps())}
      />
    );

    return (
      <BaseSelect
        ref={anchorRef}
        data-component="Select"
        trigger={
          <BaseSelect.Input
            {...inputProps}
            onKeyDown={(event) => {
              // disable opening the dropdown on key down when readonly or loading
              if (isReadOnly || isLoading) return;

              inputProps?.onKeyDown?.(event);
            }}
            {...props}
            {...sharedProps}
            isLoading={isLoading}
            id={id}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            size={size}
            selectValue={value as string}
            selectedOption={selectedOption}
            hasSections={hasSections}
            valueRightElement={valueRightElement}
            rightElement={rightElement}
            autoFocus={autoFocus}
          />
        }
        dropdownMenu={
          <BaseSelect.DropdownMenu
            {...dropdownMenuProps}
            {...dropdownLabelProp}
            isLoading={isLoading}
            loadingStateComponent={<BaseSelect.LoadingState />}
            creatableOptionComponent={creatableOptionComponent}
            renderOption={(option, index) => (
              <BaseSelect.Option {...getOptionProps({ option, index })} key={getOptionKey(option.label, index)}>
                <BaseSelect.OptionContent {...option} isSelected={isEqual(option.value, selectedOption?.value)} />
              </BaseSelect.Option>
            )}
          />
        }
      />
    );
  }
);

// eslint-disable-next-line @typescript-eslint/no-deprecated
Select.displayName = 'Select';
