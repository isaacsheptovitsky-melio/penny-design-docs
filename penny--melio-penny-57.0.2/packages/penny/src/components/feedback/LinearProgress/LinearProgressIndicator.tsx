import { chakra, forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';

import { useDataTestIdContext } from '@/utils/dataTestIdContext';

import { useStyles } from './LinearProgress.context';

export type LinearProgressIndicatorProps = TestIdProp;

export const LinearProgressIndicator = forwardRef<LinearProgressIndicatorProps, 'div'>(
  (props: LinearProgressIndicatorProps, ref) => {
    const styles = useStyles();
    const getTestId = useDataTestIdContext();

    return (
      <chakra.div
        data-component="LinearProgressIndicator"
        __css={styles['indicator']}
        {...getTestId('indicator')}
        ref={ref}
        {...props}
      />
    );
  }
);

LinearProgressIndicator.displayName = 'LinearProgressIndicator';
