import { Box } from '@chakra-ui/react';
import { uniqueId } from '@melio/penny-utils';
import { type AriaAttributes, type ChangeEventHandler, forwardRef, type HTMLAttributes, useMemo } from 'react';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { type CommonInputProps, type ControlProps } from '@/components/form/components/Form';
import { useStyleConfig } from '@/theme/hooks/use-style-config';
import { getAriaProps } from '@/utils/getAriaProps';

import { type FileType, getInputFileAcceptByType } from './helpers/get-input-file-accept';

export type FileInputProps = CommonInputProps &
  HTMLAttributes<HTMLInputElement> &
  AriaAttributes &
  Partial<Pick<ControlProps, 'control' | 'name'>> & {
    acceptTypes?: FileType[];
    placeholder?: string;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
  };

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ acceptTypes, isDisabled, isReadOnly, 'aria-describedby': ariaDescribedBy, ...props }, ref) => {
    const styles = useStyleConfig('FileInput');
    const readOnlyId = useMemo(() => uniqueId('readonly-'), []);

    const a11yProps = {
      ...getAriaProps('aria-describedby', [isReadOnly ? readOnlyId : undefined, ariaDescribedBy]),
    };

    return (
      <>
        <Box
          as="input"
          data-component="FileInput"
          type="file"
          data-testid="upload-file-input"
          accept={getInputFileAcceptByType(acceptTypes)}
          ref={ref}
          __css={styles}
          disabled={isDisabled}
          readOnly={isReadOnly}
          data-readonly={isReadOnly || null}
          title="" //removes the default tooltip from input
          {...a11yProps}
          {...props}
        />
        {isReadOnly && (
          <VisuallyHidden aria-live="polite" id={readOnlyId}>
            read only
          </VisuallyHidden>
        )}
      </>
    );
  }
);

FileInput.displayName = 'FileInput';
