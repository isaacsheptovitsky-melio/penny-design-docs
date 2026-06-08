import { useContext } from 'react';

import { type ThemeLogos } from '../foundations/logos';
import { LogosContext } from '../providers/LogosProvider';

export const useLogos = () => useContext<ThemeLogos>(LogosContext);
