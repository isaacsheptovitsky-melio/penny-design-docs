import { type ResponsiveValueType } from './Drawer.types';

const themeBreakpointsKeys = ['xs', 's', 'm', 'l', 'xl'];

export const isResponsiveType = <T>(value: unknown): value is ResponsiveValueType<T> => {
  // Check if the value is an object and not null
  if (typeof value !== 'object' || value === null) return false;

  // Validate that all keys in the object are valid ThemeBreakpointsKey values
  return Object.keys(value).every((key) => themeBreakpointsKeys.includes(key));
};
