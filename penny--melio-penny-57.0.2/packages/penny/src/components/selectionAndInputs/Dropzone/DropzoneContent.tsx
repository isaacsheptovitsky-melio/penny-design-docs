import { Box, forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';

import { useDataTestIdContext } from '@/utils/dataTestIdContext';

import { useStyles } from './Dropzone.context';

export type DropzoneContentProps = TestIdProp;

export const DropzoneContent = forwardRef<DropzoneContentProps, 'div'>((props: DropzoneContentProps, ref) => {
  const styles = useStyles();
  const getTestId = useDataTestIdContext();

  return (
    <Box ref={ref} data-component="DropzoneContent" __css={styles['content']} {...getTestId('content')} {...props} />
  );
});

DropzoneContent.displayName = 'DropzoneContent';
