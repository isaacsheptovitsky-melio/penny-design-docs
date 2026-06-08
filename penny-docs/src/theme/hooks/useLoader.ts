import { useContext } from 'react';

import { type ThemeLoader } from '../foundations/loader';
import { LoaderContext } from '../providers/LoaderProvider';

export const useLoader = () => useContext<ThemeLoader>(LoaderContext);
