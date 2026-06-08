import { type ReactNode } from 'react';

import { type FloatingMenuProps } from '../FloatingMenu/FloatingMenu.types';
import { type _MenuFooterProps, type _MenuTriggerProps } from './components';

export type MenuProps = _MenuTriggerProps &
  Pick<
    FloatingMenuProps,
    | 'isOpen'
    | 'onOpenChange'
    | 'trigger'
    | 'maxHeight'
    | 'isDisabled'
    | 'isReadOnly'
    | 'shouldTrapFocus'
    | 'data-testid'
    | 'hasItems'
    | 'shouldFitAvailableHeight'
    | 'placement'
  > & {
    /** The content of the menu (menu items). */
    children?: ReactNode | ReactNode[];
    /** The size of the menu. */
    size?: 'small' | 'large' | 'fit-content';
    /** The title of the menu. */
    title?: string;
    /** The header content of the menu. */
    header?: ReactNode;
    /** Configuration for the footer button. */
    footer?: _MenuFooterProps;
    /** Whether the menu contains sections. */
    hasSections?: boolean;
  };
