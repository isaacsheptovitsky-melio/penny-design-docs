import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const verificationCodeFieldTheme: ComponentMultiStyleConfig<'container' | 'form' | 'input', { length: number }> =
  {
    parts: ['container', 'form', 'input'],
    baseStyle: ({ length }) => ({
      container: {
        maxWidth: '490px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'xs',
      },
      form: {
        gap: 's',
        gridRowGap: 'xs',
        justifyContent: 'center',
        gridTemplateColumns: `repeat(${length}, minmax(0, 48px))`,
      },
      input: {
        textStyle: 'body2',
        textAlign: 'center',
        paddingLeft: 'none',
      },
    }),
  };
