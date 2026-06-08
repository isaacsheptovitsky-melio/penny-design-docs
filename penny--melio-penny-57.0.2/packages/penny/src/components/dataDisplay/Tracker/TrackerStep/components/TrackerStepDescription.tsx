import type { ReactNode } from 'react';

import { type DescriptionProps as TypographyDescriptionProps, Typography } from '../../../typography';
import { useTrackerStepContext } from '../TrackerStepContext';

export type TrackerStepDescriptionProps = { label: ReactNode } & TypographyDescriptionProps;

export const TrackerStepDescription = ({ label, ...props }: TrackerStepDescriptionProps) => {
  const { isActive, isCompleted } = useTrackerStepContext();

  return typeof label === 'string' ? (
    <Typography.Description {...props} label={label} isReadOnly={!isActive && !isCompleted} />
  ) : (
    label
  );
};

TrackerStepDescription.displayName = 'TrackerStepDescription';
