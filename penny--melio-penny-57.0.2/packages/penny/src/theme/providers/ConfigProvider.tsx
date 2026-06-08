import { merge } from '@melio/penny-utils';
import { type ComponentType, createContext, type PropsWithChildren, useContext } from 'react';
import ReactSVG from 'react-inlinesvg';

import { CDN_URL } from '../../global-vars';

export type PennyConfig = {
  cdnUrl: string;
  /**
   * Since react-inlinesvg is asyncally fetching the svg assets - the tests would throw
   * "An update to ReactInlineSVG inside a test was not wrapped in act(...)"
   * In order to resolve this globally - this mock has been added so that it won't fetch anything during tests.
   */
  InlineSVGComponent?: ComponentType<ReactSVGProps>;
};

const ConfigContext = createContext<PennyConfig>({ cdnUrl: '' });

export type ConfigProviderProps = PropsWithChildren<{ config?: PennyConfig }>;

export type ReactSVGProps = {
  src?: string;
};

const defaultConfig: PennyConfig = {
  cdnUrl: CDN_URL,
  InlineSVGComponent: ReactSVG as unknown as ComponentType<ReactSVGProps>,
};

export const ConfigProvider = ({ children, config }: ConfigProviderProps) => (
  <ConfigContext.Provider value={merge(defaultConfig, config || {})}>{children}</ConfigContext.Provider>
);

export const useConfig = () => useContext(ConfigContext);
