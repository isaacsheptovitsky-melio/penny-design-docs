import type { CompositeItemProps } from '@floating-ui/react';
import type { PropsWithChildren } from 'react';

type NavigableItemRole =
  | 'none'
  | 'option'
  | 'menuitem'
  | 'menuitemradio'
  | 'menuitemcheckbox'
  | 'gridcell'
  | 'radio'
  | 'checkbox';
/**
 * @private For internal use only.
 */
export type NavigationListItemProps = PropsWithChildren<CompositeItemProps> & { role?: NavigableItemRole };
