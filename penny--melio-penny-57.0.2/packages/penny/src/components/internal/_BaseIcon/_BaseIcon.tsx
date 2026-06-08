import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';
import { useIconAsset } from '@/theme/hooks/useIconAsset';
import { useIcons } from '@/theme/hooks/useIcons';
import { type AllIconKey } from '@/theme/icons/icon.types';
import { getDefaultIconsMap } from '@/theme/icons/icons';
import { type IconKey } from '@/theme/icons/icons.generated.types';
import { useConfig } from '@/theme/providers/ConfigProvider';

import { type _BaseIconProps, iconColorMapping } from './_BaseIcon.types';
import { useCachedUrlIcon } from './useCachedIcon';

function isRegularIcon(icon?: AllIconKey): icon is IconKey {
  return !!icon && Object.keys(getDefaultIconsMap('')).includes(icon);
}

/**
 * @private For internal use only.
 */
export const _BaseIcon = forwardRef<HTMLSpanElement, _BaseIconProps>(
  ({ type, size = 'small', isDisabled, isReadOnly, isInverse = false, ...props }, ref) => {
    const icons = useIcons();
    const icon = useIconAsset(type, size);
    const baseIcon = isRegularIcon(type) ? icon : icons[type];
    const isURLIcon = typeof icon === 'string';
    const styles = useStyleConfig('BaseIcon', { size, isInverse, isURLIcon });
    const { InlineSVGComponent } = useConfig();
    const cachedIcon = useCachedUrlIcon(isURLIcon ? icon : undefined);

    const sharedProps = {
      as: 'span' as const,
      'data-component': '_BaseIcon',
      __css: styles,
      ref,
      'data-disabled': isDisabled || undefined,
      'data-readonly': isReadOnly || undefined,
      'data-is-brand-color': iconColorMapping['brand'] === props.color,
      ...props,
    };

    if (!isURLIcon) {
      return (
        <Box {...sharedProps} key={type}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Box as={baseIcon} />
        </Box>
      );
    }

    if (cachedIcon) {
      return <Box {...sharedProps} dangerouslySetInnerHTML={{ __html: cachedIcon }} key={type} />;
    }

    return (
      <Box {...sharedProps} key={type}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <InlineSVGComponent src={icon} />
      </Box>
    );
  }
);

_BaseIcon.displayName = '_BaseIcon';
