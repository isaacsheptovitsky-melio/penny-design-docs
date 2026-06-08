import { chakra, forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type ChangeEventHandler } from 'react';

import { mergeRefs } from '@/utils';
import { useDataTestIdContext } from '@/utils/dataTestIdContext';

import { useDropzoneContext, useStyles } from './Dropzone.context';

const Input = chakra('input');

export type DropzoneHiddenInputProps = TestIdProp;

export const DropzoneHiddenInput = forwardRef<DropzoneHiddenInputProps, 'input'>(
  (props: DropzoneHiddenInputProps, forwardedRef) => {
    const { inputRef, multiple, accept, processFiles, disabled } = useDropzoneContext();
    const styles = useStyles();
    const getTestId = useDataTestIdContext();

    const acceptString = accept
      ? Object.entries(accept)
          .flatMap(([mimeType, extensions]) => [mimeType, ...extensions])
          .join(',')
      : undefined;

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      processFiles(Array.from(event.target.files ?? []));
      event.target.value = '';
    };

    return (
      <Input
        data-component="DropzoneHiddenInput"
        ref={mergeRefs([inputRef, forwardedRef])}
        type="file"
        tabIndex={-1}
        aria-hidden
        multiple={multiple}
        disabled={disabled || undefined}
        accept={acceptString}
        onChange={handleInputChange}
        __css={styles['hiddenInput']}
        {...getTestId('hidden-input')}
        {...props}
      />
    );
  }
);

DropzoneHiddenInput.displayName = 'DropzoneHiddenInput';
