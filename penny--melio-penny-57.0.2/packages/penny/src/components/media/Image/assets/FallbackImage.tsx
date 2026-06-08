import { Box } from '@chakra-ui/react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { ImageThemeProps } from '../Image.types';

export const FallbackImage = (props: ImageThemeProps) => {
  const styles = useMultiStyleConfig('Image', props);

  return (
    <Box
      as="svg"
      fill="none"
      __css={styles['fallbackIcon']}
      // ts-ignore is used due to `svg` props issues with `<Box/>`.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      viewBox="0 0 39 39"
      xmlns="http://www.w3.org/2000/svg"
    >
      <>
        <path
          d="M14.9476 11.6165C14.9476 13.3816 13.5167 14.8125 11.7516 14.8125C9.98657 14.8125 8.55569 13.3816 8.55569 11.6165C8.55569 9.85145 9.98657 8.42058 11.7516 8.42058C13.5167 8.42058 14.9476 9.85145 14.9476 11.6165Z"
          fill="#A7A9B4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.1638 6.82261C2.1638 4.175 4.31011 2.02869 6.95772 2.02869H32.5253C35.1729 2.02869 37.3192 4.175 37.3192 6.82261V29.1712C37.3194 29.1856 37.3194 29.2 37.3192 29.2144V32.3902C37.3192 35.0378 35.1729 37.1841 32.5253 37.1841H6.95772C4.31011 37.1841 2.1638 35.0378 2.1638 32.3902V6.82261ZM6.95772 5.22463H32.5253C33.4078 5.22463 34.1233 5.94007 34.1233 6.82261V24.0493L28.4588 15.8101C27.7959 14.8458 26.4314 14.695 25.5739 15.4913L15.8458 24.5244L12.3961 20.7092C11.6449 19.8785 10.3446 19.8656 9.57717 20.6813L5.35975 25.1638V6.82261C5.35975 5.94007 6.07519 5.22463 6.95772 5.22463ZM34.1233 29.6905V32.3902C34.1233 33.2727 33.4078 33.9881 32.5253 33.9881H6.95772C6.07519 33.9881 5.35975 33.2727 5.35975 32.3902V29.8278L10.9551 23.8807L14.3441 27.6288C15.061 28.4217 16.2879 28.4753 17.0712 27.7479L26.6638 18.8405L34.1233 29.6905Z"
          fill="#A7A9B4"
        />
      </>
    </Box>
  );
};
