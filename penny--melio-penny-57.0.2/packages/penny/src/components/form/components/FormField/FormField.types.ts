import { type TestIdProp } from '@melio/penny-utils';
import {
  type AriaAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import { type ControllerRenderProps, type FieldPath, type FieldValues } from 'react-hook-form';

import { type TypographyLabelProps } from '@/components/dataDisplay/typography';
import { type ControlProps } from '@/components/form/components/Form';
import { type FormSize } from '@/theme/utils/form.utils';

export type FormSharedProps = {
  /** The size of the field */
  size?: FormSize;
  /** Sets the field as disabled */
  isDisabled?: boolean;
  /** Sets the field as read-only */
  isReadOnly?: boolean;
  /** Sets the field in view-mode */
  isViewMode?: boolean;
  /** Sets the field in loading state */
  isLoading?: boolean;
  /** A unique identifier for the field, essential for accessibility as it allows screen readers to associate labels correctly. <br /> To link the label with the field, the provided id should be passed through the render function to the rendered field component as the id prop */
  id?: string;
  /** Maximum number of characters allowed */
  maxChars?: number;
} & AriaAttributes &
  TestIdProp;

type SharedFormFieldRenderProps = FormSharedProps & { ref?: Ref<HTMLInputElement>; isInvalid?: boolean };

export type FormFieldRenderProps =
  | SharedFormFieldRenderProps
  | (SharedFormFieldRenderProps & ControllerRenderProps<FieldValues, FieldPath<FieldValues>>);

export type FormControlProps = Pick<ControlProps, 'name' | 'control'>;

export type FormFieldContext = Pick<
  BaseFormFieldProps,
  'labelProps' | 'error' | 'helperText' | 'showOptionalIndicator'
>;

type BaseFormFieldProps = FormSharedProps & {
  /** An object of the field's label props. The form field uses the label for accessibility, so a label generally needs to be defined. `isHidden` can be used to hide the label visually. For `checkbox` inputs, which already have their own visible labels, you can choose whether to provide `labelProps`, as the purpose may already be clear from the visual context */
  labelProps?: Pick<TypographyLabelProps, 'label' | 'tooltipProps' | 'description' | 'id' | 'as'> & {
    isHidden?: boolean;
  };
  children?: ReactNode;
  /** The content to render */
  render: (props: FormFieldRenderProps, fieldContext: FormFieldContext) => ReactElement;
  /** Error message for the field */
  error?: {
    message?: string;
  };
  /** Sets the field as required */
  isRequired?: boolean;
  /** Shows (optional) next to optional fields label */
  showOptionalIndicator?: boolean;
  /** The helper text to display below the field */
  helperText?: string | ReactNode;
  /** Decides how many columns this fields will take in a row inside a `Form` component */
  colSpan?: number;
  /** Whether to reserve the space for the helper/error text so the UI won't jump when it appears/disappears */
  shouldReserveSpaceForHelperText?: boolean;
  /** align the field content - label, helper text and error text */
  align?: 'start' | 'end';
} & HTMLAttributes<HTMLDivElement> &
  Pick<CSSProperties, 'justifyContent'>;

type FormFieldWithRenderControlProps = BaseFormFieldProps & FormControlProps;
type FormFieldWithMaxChars = FormFieldWithRenderControlProps & { maxChars: number };
type FormFieldWithoutRenderControlProps = BaseFormFieldProps & {
  name?: FormControlProps['name'];
  control?: never;
  maxChars?: never;
};

export type FormFieldProps =
  | FormFieldWithoutRenderControlProps
  | FormFieldWithRenderControlProps
  | FormFieldWithMaxChars;
