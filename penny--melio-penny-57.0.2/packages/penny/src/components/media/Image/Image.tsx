import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import {
  type ForwardedRef,
  forwardRef,
  type NamedExoticComponent,
  type SyntheticEvent,
  useEffect,
  useState,
} from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { FallbackImage } from './assets/FallbackImage';
import type { BaseImageProps, ImageProps, ImageThemeProps, ImageValidateProps } from './Image.types';

/**
 * A visual representation displayed within the interface.
 */
export const ImageComponent = (props: ImageProps, ref: ForwardedRef<HTMLDivElement>) => {
  const {
    isDisabled,
    isReadOnly,
    src,
    alt,
    onError,
    onLoad,
    onClick,
    width,
    height,
    objectFit = 'cover',
    objectPosition = 'center',
    borderRadius,
    aspectRatio,
    fallbackIcon,
    'data-testid': dataTestId = 'image',
    ...rest
  } = props;
  const [hasError, setHasError] = useState(false);

  const isCircle = borderRadius === 'global.full';

  const imageProps: ImageThemeProps = {
    objectFit,
    objectPosition,
    borderRadius,
    aspectRatio,
    variant: isCircle ? 'circle' : 'square',
    width: width ?? (hasError ? '100%' : 'auto'),
    height: height ?? (hasError ? '100%' : 'inherit'),
    fallbackImageBackgroundColor: fallbackIcon ? 'transparent' : undefined,
  };

  const styles = useMultiStyleConfig('Image', imageProps);
  const getTestId = useTestId(dataTestId);

  // This function is triggered if an error occurs while loading an image
  const imageOnErrorHandler = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    onError?.(event);
  };

  // Reset the error state when the src changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasError(false);
  }, [src]);

  const sharedProps = {
    'data-component': 'Image',
    'aria-disabled': isDisabled,
    'data-readonly': isReadOnly,
    onClick: !isDisabled && !isReadOnly ? onClick : undefined,
    ref,
  };

  return !hasError ? (
    <Box
      as="img"
      {...sharedProps}
      {...getTestId()}
      {...rest}
      role={onClick ? 'button' : undefined}
      onError={imageOnErrorHandler}
      onLoad={onLoad}
      __css={styles['image']}
      // ts-ignore is used due to `src` issues with `<Box/>`.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      src={src}
      alt={alt}
    />
  ) : (
    <Box {...sharedProps} {...getTestId('fallback')} __css={styles['fallbackImage']}>
      {fallbackIcon ?? <FallbackImage {...imageProps} />}
    </Box>
  );
};

export const Image = forwardRef(ImageComponent) as <T extends BaseImageProps>(
  props: ImageValidateProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof ImageComponent>;

(Image as NamedExoticComponent).displayName = 'Image';
