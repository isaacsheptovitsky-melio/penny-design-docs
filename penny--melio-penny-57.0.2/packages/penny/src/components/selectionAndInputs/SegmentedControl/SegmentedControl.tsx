import { useTestId } from '@melio/penny-utils';
import React, { forwardRef } from 'react';

import { Control } from './components/Control';
import { DEFAULT_SEGMENT_SIZE } from './components/SegmentedControlItem.types';
import { type SegmentedControlProps } from './SegmentedControl.types';
import { SegmentedControlContext } from './SegmentedControlContext';

/**
 * Segmented control consists of control which is a container that groups two or more segments.
 * A segmented control can offer a single option or multiple options.
 */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      size = DEFAULT_SEGMENT_SIZE,
      isMulti,
      name,
      disabled,
      readOnly,
      children,
      onChange,
      'aria-required': ariaRequired,
      'data-testid': dataTestId = 'segmented-control',
      isDisabled,
      isReadOnly,
      ...props
    },
    ref
  ) => {
    const type = isMulti ? 'checkbox' : 'radio';
    const controlRole = isMulti ? 'group' : 'radiogroup';
    const getTestId = useTestId(dataTestId);

    // Map FormField props to SegmentedControl props
    const disabledValue = disabled ?? isDisabled ?? false;
    const readOnlyValue = readOnly ?? isReadOnly ?? false;

    return (
      <Control
        role={controlRole}
        // We can get `aria-required` from `react-hook-form`.
        // The attribute is only valid for `radiogroup` role so we pass it only in single select mode
        aria-required={isMulti ? undefined : ariaRequired}
        data-component="SegmentedControl"
        {...props}
        {...getTestId()}
        ref={ref}
      >
        <SegmentedControlContext.Provider
          value={{ size, disabled: disabledValue, readOnly: readOnlyValue, type, name, onChange }}
        >
          {children}
        </SegmentedControlContext.Provider>
      </Control>
    );
  }
);

SegmentedControl.displayName = 'SegmentedControl';
