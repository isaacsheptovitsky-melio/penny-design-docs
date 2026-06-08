import type { CompositeProps } from '@floating-ui/react';
import type { PropsWithChildren } from 'react';

type NavigableRole = 'listbox' | 'menu' | 'menubar' | 'radiogroup' | 'grid';
/**
 * @private For internal use only.
 */
export type NavigationListProps = PropsWithChildren<CompositeProps> & { role?: NavigableRole };
