import { type CardProps } from '../Card';

export type InteractiveCardProps = CardProps & {
  /** Determines if the component is selected. */
  selected?: boolean;
  /** Determines if the component is disabled. */
  disabled?: boolean;
  /** Determines if the component is readonly. */
  readOnly?: boolean;
  /**
   * The button type attribute. Only used when onClick is provided.
   * Will be ignored if onClick is not present.
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
};
