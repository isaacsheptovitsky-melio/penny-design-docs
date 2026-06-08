import { Box, forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type DragEventHandler, type HTMLAttributes, type KeyboardEvent, useState } from 'react';

import { useDataTestIdContext } from '@/utils/dataTestIdContext';

import { useDropzoneContext, useStyles } from './Dropzone.context';

export type DropzoneAreaProps = HTMLAttributes<HTMLDivElement> & TestIdProp;

export const DropzoneArea = forwardRef<DropzoneAreaProps, 'div'>(
  (
    {
      children,
      onKeyDown: onKeyDownProp,
      onDragEnter: onDragEnterProp,
      onDragLeave: onDragLeaveProp,
      onDragOver: onDragOverProp,
      onDrop: onDropProp,
      ...props
    }: DropzoneAreaProps,
    ref
  ) => {
    const { disabled, readOnly, invalid, openFilePicker, processFiles } = useDropzoneContext();
    const styles = useStyles();
    const getTestId = useDataTestIdContext();

    const [isDragging, setIsDragging] = useState(false);

    const isInteractive = !disabled && !readOnly;

    const handleDragEnter: DragEventHandler<HTMLDivElement> = (event) => {
      event.preventDefault();
      if (isInteractive) {
        setIsDragging(true);
      }
      onDragEnterProp?.(event);
    };

    const handleDragLeave: DragEventHandler<HTMLDivElement> = (event) => {
      event.preventDefault();
      // Prevents flicker
      if (event.currentTarget.contains(event.relatedTarget as Node)) {
        return;
      }
      setIsDragging(false);
      onDragLeaveProp?.(event);
    };

    const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
      event.preventDefault();
      onDragOverProp?.(event);
    };

    const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
      event.preventDefault();
      setIsDragging(false);
      if (isInteractive) {
        processFiles(Array.from(event.dataTransfer?.files ?? []));
      }
      onDropProp?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        // Prevents scroll when hitting space
        event.preventDefault();
        if (isInteractive) {
          openFilePicker();
        }
      }
      onKeyDownProp?.(event);
    };

    return (
      <Box
        ref={ref}
        data-component="DropzoneArea"
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        aria-invalid={invalid || undefined}
        data-readonly={readOnly || undefined}
        data-dragging={isDragging || undefined}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={isInteractive ? openFilePicker : undefined}
        onKeyDown={handleKeyDown}
        __css={styles['area']}
        {...getTestId('area')}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

DropzoneArea.displayName = 'DropzoneArea';
