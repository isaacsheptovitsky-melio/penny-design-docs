import React from 'react';

import { Checked } from './Checked';
import { Close } from './Close';
import { Info } from './Info';
import { Remove } from './Remove';

export const iconsMap = {
  info: Info,
  close: Close,
  remove: Remove,
  checked: Checked,
};

export type IconKey = keyof typeof iconsMap;

export const icons: Record<IconKey, React.FC<React.SVGProps<SVGSVGElement>>> = iconsMap;
