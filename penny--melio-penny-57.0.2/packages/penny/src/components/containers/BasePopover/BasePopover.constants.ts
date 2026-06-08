import { type Placement } from './BasePopover.types';

export const basePopoverHorizontalPlacementEdges: Placement[] = ['left-start', 'right-start', 'left-end', 'right-end'];
export const basePopoverVerticalPlacementEdges: Placement[] = ['top-start', 'bottom-start', 'top-end', 'bottom-end'];
export const basePopoverEdgesPlacements: Placement[] = [
  ...basePopoverHorizontalPlacementEdges,
  ...basePopoverVerticalPlacementEdges,
];
