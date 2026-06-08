import { chakra, forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';

import { useDataTestIdContext } from '@/utils/dataTestIdContext';

import { useStyles } from './LinearProgress.context';

export type LinearProgressTrackProps = TestIdProp;

export const LinearProgressTrack = forwardRef<LinearProgressTrackProps, 'div'>(
  (props: LinearProgressTrackProps, ref) => {
    const styles = useStyles();
    const getTestId = useDataTestIdContext();

    return (
      <chakra.div
        data-component="LinearProgressTrack"
        __css={styles['track']}
        {...getTestId('track')}
        ref={ref}
        {...props}
      />
    );
  }
);

LinearProgressTrack.displayName = 'LinearProgressTrack';
