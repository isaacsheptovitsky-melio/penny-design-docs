import { isIOS } from './isIOS';

const mobileVersionMatches = typeof navigator?.userAgent.match(/android\s(\d+)|OS\s(\d+)/i);
const iOSVersion = mobileVersionMatches?.[2] ? parseInt(mobileVersionMatches[2], 10) : null;

export const isMobileIOS = () => isIOS() && iOSVersion !== null;
