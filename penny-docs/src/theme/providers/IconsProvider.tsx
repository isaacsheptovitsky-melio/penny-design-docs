import { merge } from '@melio/penny-utils';
import { createContext, type FC, type ReactNode } from 'react';

import { type IconsMap } from '../icons/icon.types';
import { getAllIcons } from '../icons/icons';
import { useConfig } from './ConfigProvider';

export type IconsProviderProps = {
  icons?: IconsMap;
  children: ReactNode;
};

export const IconsProvider: FC<IconsProviderProps> = ({ children, icons = {} }) => {
  const { cdnUrl } = useConfig();

  return <IconsContext.Provider value={merge(getAllIcons(cdnUrl), icons)}>{children}</IconsContext.Provider>;
};

export const IconsContext = createContext<IconsMap>({} as IconsMap);
