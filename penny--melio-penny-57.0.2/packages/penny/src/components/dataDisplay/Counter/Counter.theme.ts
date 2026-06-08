import type { ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import { BackgroundStyle } from './Counter.theme.utils';
import type { CounterProps } from './Counter.types';

export const counterTheme: ComponentSingleStyleConfig<Pick<CounterProps, 'status'> & { isFixedSize: boolean }> = {
  baseStyle: ({ status, isFixedSize }) => ({
    paddingX: isFixedSize ? 'none' : 'xxs',
    textStyle: 'caption2Semi',
    display: 'inline-flex',
    minWidth: '16px',
    height: '16px',
    borderRadius: 'global.full',
    border: 'global.25',
    borderColor: 'global.neutral.A0',
    backgroundColor: BackgroundStyle[status],
    color: status === 'warning' ? 'semantic.text.primary' : 'semantic.text.inverse',
    width: 'fit-content',
    alignItems: 'center',
    justifyContent: 'center',
  }),
};
