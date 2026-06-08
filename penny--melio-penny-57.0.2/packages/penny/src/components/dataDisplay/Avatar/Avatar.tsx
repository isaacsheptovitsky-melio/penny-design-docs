import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef, useState } from 'react';

import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';
import { Image, type ImageProps } from '@/components/media/Image';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { Badge } from '../Badge';
import type { AvatarProps } from './Avatar.types';
import { getAvatarInitials } from './avatar.utils';

/**
 * Avatar component displays user profile pictures or initials in a circular or square format.
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const {
    name,
    isSelected,
    isDisabled,
    src,
    onClick,
    badge,
    'data-testid': dataTestId = 'avatar',
    bgColor,
    variant = 'circle',
    size = 'medium',
    alt,
    ...rest
  } = props;
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const isSquare = variant === 'square';
  const styles = useMultiStyleConfig('Avatar', {
    onClick,
    bgColor,
    isDisabled,
    variant,
    size,
    ...rest,
  });

  const circleImageProps: Pick<ImageProps, 'borderRadius'> = {
    borderRadius: 'global.full',
  };

  const squareImageProps: Pick<ImageProps, 'borderRadius' | 'aspectRatio'> = {
    borderRadius: 'global.100',
    aspectRatio: '1 / 1',
  };
  const isSmallAvatar = size === 'small';
  const conditionalImageProps = isSquare ? squareImageProps : circleImageProps;

  const getTestId = useTestId(dataTestId);

  return (
    <ConditionalWrapper
      condition={!!badge}
      wrapper={(children) => (
        <Badge hasBorder mark={badge} customPositions={isSmallAvatar ? { bottom: '-4px', right: '-4px' } : {}}>
          {children}
        </Badge>
      )}
    >
      <Box data-component="Avatar" {...rest} {...getTestId()} __css={styles['container']} ref={ref}>
        <Box
          aria-disabled={isDisabled}
          data-selected={isSelected || null}
          {...getTestId('content')}
          {...(!isDisabled && onClick && { role: 'button', tabIndex: 0, onClick })}
          __css={styles['avatar']}
        >
          {src && !isImageError ? (
            <Box __css={styles['image']}>
              <Image
                src={src}
                alt={alt ?? name}
                onError={() => setIsImageError(true)}
                isDisabled={isDisabled}
                {...getTestId('image')}
                {...conditionalImageProps}
              />
            </Box>
          ) : (
            <Box __css={styles['initials']} {...getTestId('initials')}>
              {getAvatarInitials(name, size === 'extra-small')}
            </Box>
          )}
        </Box>
      </Box>
    </ConditionalWrapper>
  );
});

Avatar.displayName = 'Avatar';
