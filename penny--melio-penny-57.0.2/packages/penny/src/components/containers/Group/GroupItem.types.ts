import { type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';

export type GroupItemProps = {
  display?: CSSProperties['display'];
  order?: CSSProperties['order'];
  grow?: CSSProperties['flexGrow'];
  shrink?: CSSProperties['flexShrink'];
  basis?: CSSProperties['flexBasis'];
  alignSelf?: CSSProperties['alignSelf'];
  children?: ReactNode;
  position?: CSSProperties['position'];
} & HTMLAttributes<HTMLDivElement>;
