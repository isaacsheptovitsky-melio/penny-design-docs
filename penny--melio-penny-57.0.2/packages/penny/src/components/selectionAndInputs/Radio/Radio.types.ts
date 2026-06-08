import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes, type ChangeEventHandler, type ReactNode } from 'react';

import { type _DescriptionProps } from '@/components/dataDisplay/typography/_Description';
import { type _MainLabelProps } from '@/components/dataDisplay/typography/_MainLabel';
import { type CommonInputProps } from '@/components/form/components/Form';

type CustomRenderProps = {
  descriptionProps?: never;
  mainLabelProps?: never;
  label: ReactNode;
  ariaLabel: string;
  ariaLabelledby?: string;
};

type DefaultRenderProps = {
  descriptionProps?: _DescriptionProps;
  mainLabelProps: _MainLabelProps;
  label?: never;
  ariaLabel?: string;
  ariaLabelledby?: string;
};

type RadioRenderOptions = DefaultRenderProps | CustomRenderProps;

export type RadioSize = 'large' | 'small';

export type RadioOption = RadioRenderOptions & {
  /**
   * The value of the radio item.
   */
  value: string;

  /**
   * Determines if the radio item is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Determines if the radio item is in read-only state.
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * The id of the radio item.
   */
  id?: string;
};

export type RadioProps = RadioOption &
  CommonInputProps &
  TestIdProp & {
    /**
     * The label of the radio item
     */
    label?: ReactNode;

    /**
     * The aria-label for Radio item.
     */
    ariaLabel?: string;

    /**
     * The size of the radio component.
     */
    size?: RadioSize;

    /**
     * Determines if the radio item is invalid.
     * @default false
     */
    isInvalid?: boolean;

    /**
     * Handles the click event from the radio item.
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;

    /**
     * Decides if the radio item is checked.
     */
    isChecked?: boolean;

    /**
     * The name attribute for the radio input.
     */
    name?: string;

    /**
     * The id of the radio item.
     */
    id?: string;
  } & AriaAttributes;
