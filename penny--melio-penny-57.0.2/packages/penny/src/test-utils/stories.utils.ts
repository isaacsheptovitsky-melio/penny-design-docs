import { type InputType } from 'storybook/internal/csf';

import { getUnionTypeSummary } from './storybook.utils';

const labelPropsType = `{
  label: string;
  tooltipProps?: { 
    content: ReactNode;
    shouldAddTriggerFocus?: boolean;
    triggerAriaLabel?: string;
  };
  description?: string;
}`;

export const inputModeTypes = ['none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'];

export const commonFormFieldControls: Record<string, InputType> = {
  isDisabled: {
    control: 'boolean',
    description: 'Sets the field as disabled.',
    table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
  },
  isViewMode: {
    control: 'boolean',
    description: 'Sets the field as view-mode.',
    table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
  },
  isReadOnly: {
    control: 'boolean',
    description: 'Sets the field as read-only.',
    table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
  },
  isHidden: {
    control: 'boolean',
    description:
      'Allows the field to be visually hidden from the UI while still existing in the DOM. <br /> ** To prevent the field from rendering entirely, use the React pattern: `{condition && <Form.FieldX ... />}`. **',
    table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
  },
  isLoading: {
    control: 'boolean',
    description: 'Sets the field in loading state.',
    table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
  },
  labelProps: {
    control: 'object',
    description: "An object of the field's label props.",
    table: { type: { summary: 'LabelProps', detail: labelPropsType }, category: 'props' },
  },
  helperTextProps: {
    control: 'object',
    description: 'An object of the text helper label props.',
    table: { type: { summary: '{ label: string | ReactNode }' }, category: 'props' },
  },
  placeholder: {
    control: 'text',
    description: 'The placeholder text for when there is no value.',
    table: { type: { summary: 'string' }, category: 'props' },
  },
  viewModePlaceholder: {
    control: 'text',
    description: 'The placeholder text for when there is no value and the field is in view-only mode.',
    table: { type: { summary: 'string' }, category: 'props' },
  },
  size: {
    control: 'select',
    options: ['small', 'large'],
    description: 'The size of the field.',
    table: { defaultValue: { summary: "'large'" }, type: { summary: "'small' | 'large'" }, category: 'props' },
  },
  colSpan: {
    control: 'number',
    description: 'Decides how many columns this fields will take in a row inside a `Form` component.',
    table: { defaultValue: { summary: '1' }, type: { summary: 'number' }, category: 'props' },
  },
  isRequired: {
    control: 'boolean',
    description: 'Sets the field as required.',
    table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
  },
  showOptionalIndicator: {
    control: 'boolean',
    description: 'Shows (optional) next to optional fields label.',
    table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
  },
  autoFocus: {
    control: 'boolean',
    description: 'Sets the field to be focused on mount.',
    table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
  },
  autoComplete: {
    control: 'text',
    description:
      'Provides a hint to the user agent specifying how to, or indeed whether to, prefill a form field. <br /> See the [input purposes list](https://www.w3.org/TR/WCAG21/#input-purposes) for specific field types.',
    table: { type: { summary: 'string' }, category: 'props', defaultValue: { summary: "'off'" } },
  },
  inputMode: {
    control: 'select',
    options: inputModeTypes,
    description:
      'Hints at the type of data that might be entered by the user while editing the element or its contents.',
    table: { type: { summary: getUnionTypeSummary(inputModeTypes) }, category: 'props' },
  },
};

export const commonFormFieldArgs = {
  isDisabled: false,
  isViewMode: false,
  isReadOnly: false,
  isHidden: false,
  isRequired: false,
  showOptionalIndicator: false,
  size: 'large',
  autoFocus: false,
};
