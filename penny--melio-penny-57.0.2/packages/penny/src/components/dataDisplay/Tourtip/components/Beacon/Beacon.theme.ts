import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const beaconTheme: ComponentMultiStyleConfig<'beaconWrapper' | 'beacon' | 'beaconDot'> = {
  parts: ['beaconWrapper', 'beacon', 'beaconDot'],
  baseStyle: {
    // This wrapper is to prevent the beacon animation from affecting the popover position.
    beaconWrapper: {
      width: '24px',
      height: '24px',
      // Resets the button styles.
      padding: 'none',
      border: 'global.none',
      backgroundColor: 'transparent',
      outline: 'none',
    },
    beacon: {
      backgroundColor: 'global.brand.200',
      height: '24px',
      width: '24px',
      borderRadius: 'global.full',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    beaconDot: {
      bgColor: 'semantic.icon.brand',
      height: '8px',
      width: '8px',
      borderRadius: 'global.full',
    },
  },
};
