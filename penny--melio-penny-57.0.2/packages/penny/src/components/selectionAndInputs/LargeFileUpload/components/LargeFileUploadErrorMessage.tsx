import { isWindowsOS, type TestIdProp } from '@melio/penny-utils';

import { Text } from '@/components/dataDisplay';

type LargeFileUploadErrorMessageProps = {
  errorMessage?: string;
  fileError?: string | null;
  invalidElementId?: string;
} & TestIdProp;

export const LargeFileUploadErrorMessage = ({
  errorMessage,
  fileError,
  invalidElementId,
  ...props
}: LargeFileUploadErrorMessageProps) => {
  const errorMessageRole = isWindowsOS() ? { role: 'alert' } : {};

  return (
    <Text textStyle="body4" color="semantic.text.critical.rest" id={invalidElementId} {...errorMessageRole} {...props}>
      {errorMessage || fileError}
    </Text>
  );
};

LargeFileUploadErrorMessage.displayName = 'LargeFileUploadErrorMessage';
