import { forwardRef, type ReactNode } from 'react';

import { Trigger as _Trigger } from '../../Context/components';
export const Trigger = forwardRef<HTMLDivElement, { children?: ReactNode }>((props, ref) => (
  <_Trigger data-component="FlatMenu.Trigger" {...props} ref={ref} />
));

Trigger.displayName = 'FlatMenu.Trigger';
