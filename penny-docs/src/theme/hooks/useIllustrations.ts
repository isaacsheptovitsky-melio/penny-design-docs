import { useContext } from 'react';

import { type ThemeIllustrations } from '../defaultIllustrations/illustrations.types';
import { IllustrationsContext } from '../providers/IllustrationsProvider';

export const useIllustrations = () => useContext<ThemeIllustrations>(IllustrationsContext);
