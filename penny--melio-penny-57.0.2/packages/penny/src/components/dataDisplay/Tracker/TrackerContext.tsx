import { type TestIdProp } from '@melio/penny-utils';
import { createContext, useContext } from 'react';

import {
  DEFAULT_TRACKER_STATUS,
  DEFAULT_TRACKER_VARIANT,
  DEFAULT_TRACKER_WIDTH,
  type TrackerProps,
  type TrackerStatus,
} from './Tracker.types';

export type TrackerContextData = {
  variant: TrackerProps['variant'];
  status: TrackerStatus;
  width: TrackerProps['width'];
  stepsAmount: number;
} & TestIdProp;

export const TrackerContext = createContext<TrackerContextData>({
  stepsAmount: 0,
  variant: DEFAULT_TRACKER_VARIANT,
  width: DEFAULT_TRACKER_WIDTH,
  status: DEFAULT_TRACKER_STATUS,
});
export const useTrackerContext = () => useContext(TrackerContext);
