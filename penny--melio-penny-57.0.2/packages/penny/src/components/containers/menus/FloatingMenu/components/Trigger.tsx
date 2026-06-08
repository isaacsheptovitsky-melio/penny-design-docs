import { forwardRef, type ReactNode } from 'react';

import { Trigger as _Trigger } from '../../Context/components';
export const Trigger = forwardRef<HTMLDivElement, { children?: ReactNode }>((props, ref) => (
  <_Trigger data-component="FloatingMenu.Trigger" {...props} ref={ref} />
));

Trigger.displayName = 'FloatingMenu.Trigger';
