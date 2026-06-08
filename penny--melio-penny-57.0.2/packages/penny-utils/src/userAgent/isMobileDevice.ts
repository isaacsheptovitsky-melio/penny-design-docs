import { isMobileAndroid } from './isMobileAndroid';
import { isMobileIOS } from './isMobileIOS';

export const isMobileDevice = () => isMobileIOS() || isMobileAndroid();
