import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const avatarWithDetailsTheme: ComponentMultiStyleConfig<
  'container' | 'avatarContainer' | 'avatar' | 'checkbox',
  { isAvatarHover: boolean; isSelected?: boolean }
> = {
  parts: ['container', 'avatarContainer', 'avatar', 'checkbox'],
  baseStyle: ({ isAvatarHover, isSelected }) => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: 's',
      height: '44px',
    },
    avatarContainer: {
      position: 'relative',

      _disabled: {
        pointerEvents: 'none',
      },
    },
    avatar: {
      opacity: isAvatarHover || isSelected ? '0' : '1',
      transition: 'opacity 0.2s ease',
    },
    checkbox: {
      position: 'absolute',
      inset: '0',
      display: 'flex',
      width: '100%',
      height: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: isAvatarHover || isSelected ? '1' : '0',
      transition: 'opacity 0.2s ease',
    },
  }),
};
