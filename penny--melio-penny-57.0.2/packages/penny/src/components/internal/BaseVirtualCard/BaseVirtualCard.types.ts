import { type TestIdProp } from '@melio/penny-utils';
import { type ReactNode } from 'react';

export type BaseVirtualCardProps = {
  variant: 'white' | 'black' | 'brand';
  backgroundImageSrc?: string;
  children?: ReactNode;
} & TestIdProp;
