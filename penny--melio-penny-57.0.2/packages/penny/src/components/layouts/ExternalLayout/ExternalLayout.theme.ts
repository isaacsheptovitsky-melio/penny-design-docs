import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { type InternalCSSObject } from '@/theme/types';

const sharedHeaderStyle = {
  width: 'inherit',
  top: 0,
  left: 0,
  position: 'fixed',
  backgroundColor: 'semantic.background.brand.primary',
} as InternalCSSObject;

export const externalLayoutTheme: ComponentMultiStyleConfig<
  'container' | 'header' | 'fixedHeader' | 'logoContainer' | 'headerContainer' | 'wrapper' | 'contentContainer'
> = {
  parts: ['container', 'header', 'fixedHeader', 'logoContainer', 'headerContainer', 'wrapper', 'contentContainer'],
  baseStyle: {
    container: {
      height: '100%',
      width: '100%',
      position: 'relative',
      backgroundColor: 'semantic.background.primary',
      // Aligns the loader to the center
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: 'inherit',
      width: 'inherit',
      alignItems: 'center',
      overflowY: 'auto',

      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineWidth: '2px',
      },
    },
    header: {
      ...sharedHeaderStyle,
      height: { xs: '56px', s: '176px' },
    },
    fixedHeader: {
      ...sharedHeaderStyle,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      height: { xs: '56px', s: '72px' },
      paddingX: { xs: 's', s: 'm', xl: 'm' },
      zIndex: 1100,
      gap: 'xs',
    },
    headerContainer: {
      gridRow: '1 / -1',
      justifySelf: 'flex-end',
    },
    logoContainer: {
      gridRow: '-1 / 1',
      justifySelf: 'flex-start',
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'm',
      width: '100%',
      maxWidth: '600px',
      marginTop: { xs: '56px' as never, s: 'xxxl' },
      marginBottom: { xs: 'none', s: 'xxxl' },
      flexGrow: 1,
      zIndex: { xs: 0, s: 1000 },
    },
  },
};
