import { type CSSProperties } from 'react';

export type WidthProp = 'full' | 'fit-content' | 'min-content' | 'auto';

export const widthsMapping: Record<WidthProp, CSSProperties['width']> = {
  full: '100%',
  'fit-content': 'fit-content',
  'min-content': 'min-content',
  auto: 'auto',
};

export type HeightProp = 'full' | 'fit-content' | 'min-content' | 'auto';

export const heightsMapping: Record<HeightProp, CSSProperties['height']> = {
  full: '100%',
  'fit-content': 'fit-content',
  'min-content': 'min-content',
  auto: 'auto',
};
