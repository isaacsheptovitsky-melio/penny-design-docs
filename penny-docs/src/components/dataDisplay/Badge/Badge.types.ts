import type { TestIdProp } from '@melio/penny-utils';
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';

/**
 * Placement options for the badge mark relative to the children element
 */
export type BadgePlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type BadgeProps = PropsWithChildren<
  {
    /**
     * The element that is positioned.
     */
    mark: ReactNode;

    /**
     * Determines if the mark has a border surrounding it.
     * @default false
     */
    hasBorder?: boolean;

    /**
     * The vertical and horizontal offsets of the mark from the edge of the children.
     * The offset is -2px.
     * @default 'bottom-right'
     */
    placement?: BadgePlacement;

    /**
     * An object of the specific top, bottom, right and left offset of the mark from the edge of the children.
     * This prop should be used to override the default placement.
     */
    customPositions?: {
      top?: CSSProperties['top'];
      right?: CSSProperties['right'];
      bottom?: CSSProperties['bottom'];
      left?: CSSProperties['left'];
    };
  } & TestIdProp
>;
