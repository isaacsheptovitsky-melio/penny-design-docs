import { type MouseEventHandler, type ReactNode } from 'react';

import { type ListItemProps } from '@/components/dataDisplay/ListItem';
import { type TypographyMainLabelProps } from '@/components/dataDisplay/typography';

import { type ActionsDropdownMenuItemProps } from '../../menus';
import { type InteractiveCardProps } from '../InteractiveCard';

export type MenuActionsItems = ActionsDropdownMenuItemProps[];

export type SelectionCardProps = Omit<InteractiveCardProps, 'children'> & {
  /** The properties passed to the main label. */
  mainLabelProps: { label: string } & Pick<TypographyMainLabelProps, 'secondaryLabel' | 'pillProps' | 'tooltipProps'>;
  /** Element displayed on the left side of the card. Commonly used to render an icon / brand-symbol / image. */
  leftElement?: ReactNode;
  /** The properties passed to the label. */
  labelProps?: ListItemProps['labelProps'];
  /** The properties passed to the description. */
  descriptionProps?: ListItemProps['descriptionProps'];
  /** Whether the card is disabled for selection or not. */
  disabled?: boolean;
  /** Whether the card is readonly for selection or not. */
  readOnly?: boolean;
  /** Whether the card is selected or not. */
  selected?: boolean;
  /** Handles the click event of the card. */
  onClick?: InteractiveCardProps['onClick'];
} & OneOrNone<{
    /** If passed, a menu is rendered. The items are the actions that are presented in the dropdown, and the `triggerAriaLabel` overrides the default aria-label of the trigger. **Either this or `action` are allowed.** */
    menuActions: { items: MenuActionsItems; triggerAriaLabel?: string };
    /** An action that accompanies the description text. **Either this or `menuActions` are allowed.** */
    action: { label: string; onClick: MouseEventHandler };
  }>;
