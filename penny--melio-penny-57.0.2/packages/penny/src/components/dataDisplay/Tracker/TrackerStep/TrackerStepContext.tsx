import { createContext, useContext } from 'react';

import { DEFAULT_TRACKER_STATUS, DEFAULT_TRACKER_VARIANT, type TrackerProps } from '../Tracker.types';
import type { TrackerStepProps } from './TrackerStep.types';

export type TrackerStepContextData = Pick<TrackerStepProps, 'isActive' | 'isCompleted'> & {
  variant: TrackerProps['variant'];
  status: TrackerProps['status'];
};

export const TrackerStepContext = createContext<TrackerStepContextData>({
  variant: DEFAULT_TRACKER_VARIANT,
  status: DEFAULT_TRACKER_STATUS,
});

export const useTrackerStepContext = () => useContext(TrackerStepContext);
