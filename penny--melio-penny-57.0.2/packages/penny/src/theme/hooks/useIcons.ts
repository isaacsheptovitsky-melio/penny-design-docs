import { useContext } from 'react';

import { type IconsMap } from '../icons/icon.types';
import { IconsContext } from '../providers/IconsProvider';

export const useIcons = () => useContext<IconsMap>(IconsContext);
