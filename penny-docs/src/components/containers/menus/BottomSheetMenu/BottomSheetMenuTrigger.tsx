import { type TestIdProp } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Trigger as _Trigger } from '../Context/components/Trigger/Trigger';

export const BottomSheetMenuTrigger = forwardRef<HTMLElement, TestIdProp>((props, ref) => (
  <_Trigger data-component="BottomSheetMenuTrigger" {...props} ref={ref} />
));

BottomSheetMenuTrigger.displayName = 'BottomSheetMenuTrigger';
