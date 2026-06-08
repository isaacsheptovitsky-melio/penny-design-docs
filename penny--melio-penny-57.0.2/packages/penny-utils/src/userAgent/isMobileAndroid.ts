import { isAndroid } from './isAndroid';

const mobileVersionMatches = typeof navigator?.userAgent.match(/android\s(\d+)|OS\s(\d+)/i);
const androidVersion = mobileVersionMatches?.[1] ? parseInt(mobileVersionMatches[1], 10) : null;

export const isMobileAndroid = () => isAndroid() && androidVersion !== null;
