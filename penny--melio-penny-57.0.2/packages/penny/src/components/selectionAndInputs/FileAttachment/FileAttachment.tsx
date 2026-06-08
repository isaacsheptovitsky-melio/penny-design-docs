import { Box } from '@chakra-ui/react';
import { useBoolean, useHasOverflow, useTestId } from '@melio/penny-utils';
import { type ChangeEvent, forwardRef, useRef, useState } from 'react';

import { NakedButton, type NakedButtonProps } from '@/components/action/NakedButton';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { Icon } from '@/components/foundations/Icon';
import { Blanket } from '@/components/internal/Blanket';
import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';
import { IFrame } from '@/components/internal/IFrame';
import { Image } from '@/components/media/Image';
import { getInputFileAcceptByType } from '@/components/selectionAndInputs/FileInput/helpers/get-input-file-accept';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { FileAttachmentEmpty } from './assets/FileAttachmentEmpty';
import { type FileAttachmentProps } from './FileAttachment.types';

export const FileAttachment = forwardRef<HTMLDivElement, FileAttachmentProps>(
  (
    {
      isReadOnly,
      isViewMode,
      value,
      isLoading,
      onChange,
      onViewModeClick,
      acceptTypes,
      deleteButtonText = 'Delete File',
      fileAltText,
      overrideFileName,
      width = 176,
      'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.FILE_ATTACHMENT,
      'aria-label': ariaLabel = 'file attachment',
      'aria-hidden': ariaHidden = undefined,
      fileInputAriaLabel = 'upload file',
      deleteButtonAriaLabel = 'Delete file',
      viewModeIcon = 'attachment',
      ...props
    },
    ref
  ) => {
    const hiddenFileInputRef = useRef<HTMLInputElement>(null);
    const isEmpty = !value;
    const [isHover, setIsHover] = useBoolean(false);
    const [file, setFile] = useState<File>();
    const [noPreview, setNoPreview] = useState<boolean>();
    const getTestId = useTestId(dataTestId);

    const noPreviewFileName = overrideFileName ?? fileAltText ?? value ?? file?.name;
    const noPreviewFileNameRef = useRef(null);
    const { hasOverflowY } = useHasOverflow(noPreviewFileNameRef);

    const isEditState = !isReadOnly && !isViewMode;
    const showFileAttachmentEmpty = isEmpty;
    const showImage = !isEmpty && !noPreview;
    const showImageMask = isEditState;
    const showLoader = isLoading;
    const showDeleteButton = isEditState && value;
    const isViewModeReadOnly = (isViewMode && !onViewModeClick && !isEmpty) || isReadOnly;
    const showAttachmentIcon = !isEmpty && !isEditState && !isLoading;
    const showEditIcon = isEditState && !isLoading;
    const showIcon = showAttachmentIcon || showEditIcon;
    const isClickable = !isReadOnly && (!isViewMode || !isEmpty || (isViewMode && onViewModeClick)) && !isLoading;

    const handleClick = () => {
      if (!isClickable) return;
      if (isViewMode && value) {
        onViewModeClick?.(value);
        return;
      }
      hiddenFileInputRef.current?.click();
    };

    const handleChange = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      if (files?.[0]) {
        setNoPreview(false);
        setFile(files[0]);
        const fileUrl = URL.createObjectURL(files[0]);
        onChange?.(fileUrl, files[0]);
      }
    };

    const handleDelete = (event: MouseEvent) => {
      event.stopPropagation();
      // clear input so same file can be chosen again (if user wants)
      if (hiddenFileInputRef.current) {
        hiddenFileInputRef.current.value = '';
      }
      onChange?.(null);
    };

    const styles = useMultiStyleConfig('FileAttachment', { isEmpty, onViewModeClick, width });

    return (
      <Box
        data-component="FileAttachment"
        {...props}
        ref={ref}
        __css={styles['container']}
        onMouseOver={setIsHover.on}
        onMouseOut={setIsHover.off}
        {...getTestId()}
      >
        <Box
          as="button"
          aria-label={ariaLabel}
          data-view-mode={isViewMode || null}
          data-readonly={isViewModeReadOnly || null}
          data-loading={isLoading || null}
          __css={styles['fileImageContainer']}
          tabIndex={isClickable ? 0 : -1}
          onClick={handleClick}
          aria-hidden={ariaHidden ?? !isClickable}
          {...getTestId('container')}
        >
          {showIcon && (
            <Box
              __css={styles['attachmentIconContainer']}
              data-view-mode={isViewMode || null}
              data-readonly={isReadOnly || null}
              data-hover={isHover || null}
              {...getTestId('icon-container')}
            >
              <Icon
                type={isViewMode || isReadOnly ? viewModeIcon : 'image-add'}
                color="inverse"
                size={isViewMode || isReadOnly ? 'small' : 'large'}
                data-hover={isHover || null}
                {...getTestId('icon')}
              />
            </Box>
          )}
          {showFileAttachmentEmpty && <FileAttachmentEmpty {...getTestId('empty')} />}
          {showImage &&
            (file?.type.includes('pdf') ? (
              <IFrame title={fileAltText ?? file.name} __css={styles['pdf']} src={value} {...getTestId('pdf')} />
            ) : (
              <Image
                alt={fileAltText ?? value}
                src={value}
                onError={() => setNoPreview(true)}
                width="inherit"
                {...getTestId('image')}
              />
            ))}
          {noPreview && value && (
            <ConditionalWrapper
              condition={hasOverflowY}
              wrapper={(children) => <Tooltip content={noPreviewFileName as string}>{children}</Tooltip>}
            >
              <Box as="span" __css={styles['noPreview']} ref={noPreviewFileNameRef} {...getTestId('no-preview')}>
                {noPreviewFileName}
              </Box>
            </ConditionalWrapper>
          )}
          <Blanket isOpen={showImageMask} isLoading={showLoader} {...getTestId('blanket')} />
          <Box
            as="input"
            // ts-ignore is used due to `type` issues with `<Box/>`.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            type="file"
            aria-label={fileInputAriaLabel}
            accept={getInputFileAcceptByType(acceptTypes)}
            ref={hiddenFileInputRef}
            style={{ display: 'none' }}
            onChange={handleChange}
            {...getTestId('input')}
          />
        </Box>
        {showDeleteButton && (
          <Box __css={styles['deleteButton']}>
            <NakedButton
              isDisabled={isLoading}
              variant="critical"
              onClick={handleDelete as unknown as NakedButtonProps['onClick']}
              label={deleteButtonText}
              aria-label={deleteButtonAriaLabel}
              {...getTestId('delete-file')}
            />
          </Box>
        )}
      </Box>
    );
  }
);

FileAttachment.displayName = 'FileAttachment';
