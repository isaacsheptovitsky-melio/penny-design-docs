import type { TestIdProp } from '@melio/penny-utils';

import type { TypographyDescriptionProps, TypographyLabelProps, TypographyMainLabelProps } from '../typography';

/**
 * Text alignment options for list item content
 */
export type ListItemTextAlign = 'start' | 'center';

export type ListItemProps = {
  /**
   * The properties passed to the main label.
   */
  mainLabelProps: Exclude<TypographyMainLabelProps, 'isDisabled' | 'isReadOnly'>;

  /**
   * The properties passed to the label.
   */
  labelProps?: Exclude<TypographyLabelProps, 'isDisabled' | 'isReadOnly' | 'isInvalid'>;

  /**
   * The properties passed to the description.
   */
  descriptionProps?: Exclude<TypographyDescriptionProps, 'isDisabled' | 'isInvalid'>;

  /**
   * Determines if the component is disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Determines if the component is invalid.
   * Should only be used if `mainLabelProps: { variant: 'default' }`.
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Determines if the component is read-only.
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * Determines if the component's content is aligned to the start or center.
   * @default 'start'
   */
  textAlign?: ListItemTextAlign;
} & TestIdProp;
