import type { TestIdProp } from '@melio/penny-utils';
import type { PropsWithChildren, ReactNode } from 'react';

import type { DataAttributes } from '../Tracker.types';

type BaseTrackerStepProps = {
  isActive?: boolean;
  isCompleted?: boolean;
  indicator?: ReactNode;
} & DataAttributes;

export type TrackerStepProps = PropsWithChildren<BaseTrackerStepProps & TestIdProp>;
