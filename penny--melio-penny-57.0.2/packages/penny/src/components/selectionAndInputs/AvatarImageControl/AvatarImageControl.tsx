import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import type { ChangeEvent, MouseEvent } from 'react';
import { forwardRef, useRef } from 'react';

import { NakedButton, type NakedButtonProps } from '@/components/action/NakedButton';
import { getAvatarInitials } from '@/components/dataDisplay/Avatar/avatar.utils';
import { Icon } from '@/components/foundations/Icon';
import { Loader } from '@/components/foundations/Loader';
import { Image } from '@/components/media/Image';
import { getInputFileAcceptByType } from '@/components/selectionAndInputs/FileInput';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { AvatarImageControlProps } from './AvatarImageControl.types';

/**
 * The Avatar image control displays a user or company, for recognition and personalization.
 */
export const AvatarImageControl = forwardRef<HTMLDivElement, AvatarImageControlProps>(
  (
    {
      isViewMode,
      viewModePlaceholder,
      deleteButtonText,
      value,
      onChange,
      isLoading,
      acceptTypes,
      'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.AVATAR_IMAGE_CONTROL,
      variant = 'circle',
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('AvatarImageControl', { isViewMode, isLoading, variant });
    const getTestId = useTestId(dataTestId);

    const hiddenFileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
      if (isViewMode || isLoading) return;
      hiddenFileInputRef.current?.click();
    };

    const handleChange = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      if (files?.[0]) {
        onChange?.(files[0]);
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

    const showImage = !!value;
    const showInitials = isViewMode && !value;
    const showDeleteButton = !isViewMode && value;
    const showLoader = isLoading && !isViewMode; // don't show loader if `isReadyOnly` to avoid strange state (though we shouldn't reach this state at all)
    const isInteractive = !isViewMode && !isLoading;

    return (
      <Box data-component="AvatarImageControl" {...props} ref={ref} __css={styles['container']} {...getTestId()}>
        <Box
          __css={styles['avatar']}
          onClick={handleClick}
          {...(isInteractive ? { as: 'button', type: 'button', 'aria-label': 'Add Image' } : {})}
          {...getTestId('add-button')}
        >
          {isInteractive && (
            <Box __css={styles['icon']}>
              <Icon type="image-add" color={showImage ? 'inverse' : 'default'} aria-hidden />
            </Box>
          )}
          {showImage && (
            <Box __css={styles['image']}>
              <Image
                borderRadius={variant === 'circle' ? 'global.full' : undefined}
                alt="avatar image"
                src={value}
                {...getTestId('avatar-image')}
              />
            </Box>
          )}
          {showLoader && (
            <Loader color={showImage ? 'semantic.icon.inverse' : 'semantic.icon.primary'} {...getTestId('loader')} />
          )}
          {showInitials && (
            <Box __css={styles['initials']} {...getTestId('initials')}>
              {getAvatarInitials(viewModePlaceholder)}
            </Box>
          )}
          <Box
            as="input"
            // ts-ignore is used due to `type` issues with `<Box/>`.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            type="file"
            aria-label="upload image"
            accept={getInputFileAcceptByType(acceptTypes)}
            ref={hiddenFileInputRef}
            style={{ display: 'none' }}
            onChange={handleChange}
            {...getTestId('input')}
          />
        </Box>
        {showDeleteButton && (
          <NakedButton
            isDisabled={isLoading}
            variant="critical"
            onClick={handleDelete as unknown as NakedButtonProps['onClick']}
            label={deleteButtonText}
            {...getTestId('delete-button')}
          />
        )}
      </Box>
    );
  }
);

AvatarImageControl.displayName = 'AvatarImageControl';
