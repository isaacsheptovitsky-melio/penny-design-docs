import { type TestIdProp } from '@melio/penny-utils';
import { type ButtonHTMLAttributes, type HTMLAttributes, type MouseEventHandler, type PropsWithChildren } from 'react';

import { type ThemeSpaceKey } from '@/theme/foundations/spaces';
import { type WidthProp } from '@/theme/utils/utils';

/**
 * The type of the card styling variant.
 */
export type CardVariant = 'default' | 'flat';

/**
 * The width behavior of the card.
 */
export type CardWidth = Extract<WidthProp, 'full' | 'min-content' | 'fit-content'>;

// Utility type to conditionally switch between button and div attributes
type ConditionalAttributes<T> = T extends { onClick: MouseEventHandler<HTMLButtonElement> }
  ? ButtonHTMLAttributes<HTMLButtonElement>
  : HTMLAttributes<HTMLDivElement>;

export type CardProps = PropsWithChildren<
  TestIdProp & {
    /** The card's x-axis padding. @default 'm' */
    paddingX?: ThemeSpaceKey;
    /** The card's y-axis padding. @default 'm' */
    paddingY?: ThemeSpaceKey;
    /** The width behavior of the card. @default 'full' */
    width?: CardWidth;
    /** The type of the card. @default 'default' */
    variant?: CardVariant;
    /** An event for when clicking the card. */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    /** Whether the card is disabled (only applies when onClick is provided). */
    disabled?: boolean;
    /** Whether the card is read-only (only applies when onClick is provided). */
    readOnly?: boolean;
  } & ConditionalAttributes<{
      onClick?: MouseEventHandler<HTMLButtonElement>;
    }>
>;

export const ariaRoleType = `
  | "alert"
  | "alertdialog"
  | "application"
  | "article"
  | "banner"
  | "button"
  | "cell"
  | "checkbox"
  | "columnheader"
  | "combobox"
  | "complementary"
  | "contentinfo"
  | "definition"
  | "dialog"
  | "directory"
  | "document"
  | "feed"
  | "figure"
  | "form"
  | "grid"
  | "gridcell"
  | "group"
  | "heading"
  | "img"
  | "link"
  | "list"
  | "listbox"
  | "listitem"
  | "log"
  | "main"
  | "marquee"
  | "math"
  | "menu"
  | "menubar"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "navigation"
  | "none"
  | "note"
  | "option"
  | "presentation"
  | "progressbar"
  | "radio"
  | "radiogroup"
  | "region"
  | "row"
  | "rowgroup"
  | "rowheader"
  | "scrollbar"
  | "search"
  | "searchbox"
  | "separator"
  | "slider"
  | "spinbutton"
  | "status"
  | "switch"
  | "tab"
  | "table"
  | "tablist"
  | "tabpanel"
  | "term"
  | "textbox"
  | "timer"
  | "toolbar"
  | "tooltip"
  | "tree"
  | "treegrid"
  | "treeitem"
  | (string & {});
`;
