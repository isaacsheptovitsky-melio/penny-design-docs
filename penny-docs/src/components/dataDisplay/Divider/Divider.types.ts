import type { AriaAttributes, AriaRole, ElementType } from 'react';

/**
 * Divider orientation variants
 */
export type DividerVariant = 'horizontal' | 'vertical';

export type DividerProps = AriaAttributes & {
  /**
   * The divider's variant.
   * @default 'horizontal'
   */
  variant?: DividerVariant;

  /**
   * The text in the divider.
   */
  label?: string;

  /**
   * Children are not supported for Divider component
   */
  children?: never;

  /**
   * The semantic meaning of the element.
   */
  role?: AriaRole;

  /**
   * Determines which type of element the component should be rendered as.
   * @default 'div'
   */
  as?: ElementType;
};
