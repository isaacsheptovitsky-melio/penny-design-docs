import { useContext } from 'react';

import { type ThemeSpinner } from '../foundations/spinner';
import { SpinnerContext } from '../providers/SpinnerProvider';

export const useSpinner = () => useContext<ThemeSpinner>(SpinnerContext);
