import React, { type PropsWithChildren } from 'react';

import { BasePopoverContext } from '../BasePopoverContext';
import { type UsePopoverReturn } from '../useBasePopover';

export type BasePopoverRootProps = PropsWithChildren<{ popover: UsePopoverReturn }>;

export const BasePopoverRoot = ({ popover, children }: BasePopoverRootProps) => (
  <BasePopoverContext.Provider value={popover}>{children}</BasePopoverContext.Provider>
);

BasePopoverRoot.displayName = 'BasePopoverRoot';
