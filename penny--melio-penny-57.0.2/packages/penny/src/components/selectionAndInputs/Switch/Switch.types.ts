import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes } from 'react';

import { type CommonInputProps } from '@/components/form/components/Form/inputs/types';

export type SwitchSize = 'small' | 'large';

export type BaseSwitchProps = CommonInputProps & {
  /**
   * The size of the switch.
   * @default 'large'
   */
  size?: SwitchSize;

  /**
   * The label next to the switch.
   */
  label?: string;

  /**
   * Determines if the switch is disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * The value of the switch.
   */
  value?: boolean;

  /**
   * The default value of the switch.
   * @default false
   */
  defaultIsChecked?: boolean;

  /**
   * Handles the onChange event from the switch.
   */
  onChange?: (isChecked: boolean) => void;

  /**
   * The tab index for the switch.
   */
  tabIndex?: number;

  /**
   * Sets the switch as read-only.
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * Determines if the switch should take the full width of its container.
   * @default false
   */
  isFullWidth?: boolean;

  /**
   * Set the trigger to be focused on mount.
   * @default false
   */
  autoFocus?: boolean;

  /**
   * The `data-testid` attribute for testing purposes.
   */
  'data-testid'?: string;
} & AriaAttributes &
  TestIdProp;

type InvalidSwitchProps = {
  label: string;
  size: Extract<SwitchSize, 'small'>;
};

export type SwitchValidateProps<T extends BaseSwitchProps> = T extends InvalidSwitchProps
  ? "SwitchProps Error: The `label` prop is not supported when the `size` prop is set to 'small'."
  : T;

export type SwitchProps = SwitchValidateProps<BaseSwitchProps>;
