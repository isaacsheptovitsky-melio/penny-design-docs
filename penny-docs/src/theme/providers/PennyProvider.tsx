import { ConfigProvider, type ConfigProviderProps } from './ConfigProvider';
import { ThemeProvider, type ThemeProviderProps } from './ThemeProvider';

export type PennyProviderProps = ThemeProviderProps & ConfigProviderProps;

export const PennyProvider = ({ children, config, ...rest }: PennyProviderProps) => (
  <ConfigProvider config={config}>
    <ThemeProvider {...rest}>{children}</ThemeProvider>
  </ConfigProvider>
);
