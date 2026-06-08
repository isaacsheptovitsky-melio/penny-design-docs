import { Typography, type TypographyMainLabelProps } from '../../../typography';
import { useTrackerStepContext } from '../TrackerStepContext';

export type TrackerStepTitleProps = {
  label: string;
} & Pick<TypographyMainLabelProps, 'pillProps' | 'iconProps' | 'isReadOnly'>;

export const TrackerStepTitle = (props: TrackerStepTitleProps) => {
  const { isActive, isCompleted } = useTrackerStepContext();

  return <Typography.MainLabel size="small" variant="bold" isReadOnly={!isActive && !isCompleted} {...props} />;
};

TrackerStepTitle.displayName = 'TrackerStepTitle';
