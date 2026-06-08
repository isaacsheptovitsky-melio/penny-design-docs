import { cloneDeep, merge } from '@melio/penny-utils';
import { createContext, type FC, type ReactNode } from 'react';

import { getDefaultIllustrations } from '../defaultIllustrations/defaultIllustrations.generated';
import { type ThemeIllustrations } from '../defaultIllustrations/illustrations.types';
import { type ThemeOptions } from '../types';
import { useConfig } from './ConfigProvider';

export type IllustrationsProviderProps = {
  illustrations: ThemeOptions['illustrations'];
  children: ReactNode;
};

export const IllustrationsContext = createContext<ThemeIllustrations>({} as ThemeIllustrations);

export const IllustrationsProvider: FC<IllustrationsProviderProps> = ({ children, illustrations = {} }) => {
  const { cdnUrl } = useConfig();

  return (
    <IllustrationsContext.Provider
      value={merge(cloneDeep(getDefaultIllustrations(cdnUrl)), illustrations) as ThemeIllustrations}
    >
      {children}
    </IllustrationsContext.Provider>
  );
};
