import { ThemeOptions } from '../../../packages/penny/src/theme/types';
import { capOneTheme, cloverTheme, melioTheme } from '../../themes';
import { defaultTheme } from './default-theme';

type Themes = Record<string, { theme?: ThemeOptions; name: string; brandColor?: string }>;

export const THEMES: Themes = {
  default: { theme: defaultTheme, name: 'Default' },
  melio: { theme: melioTheme, name: 'Melio' },
  cap1: { theme: capOneTheme, name: 'Capital One' },
  clover: { theme: cloverTheme, name: 'Clover' },
};

export const DYNAMIC_THEMES: Themes = {
  default: { theme: defaultTheme, name: 'Default' },
  melio: { name: 'Melio', brandColor: '#7849ff' },
  'capital-one': { name: 'Capital One', brandColor: '#0276b1' },
  clover: { name: 'Clover', brandColor: '#228800' },
  adp: { name: 'ADP', brandColor: '#1D4EB3' },
  'deployments-demo': { name: 'Deployments Demo', brandColor: '#235AE4' },
  fiserv_bmo: { name: 'Fiserv BMO', brandColor: '#0075BE' },
  'fiserv_citizens-no-fee-customer': { name: 'Fiserv Citizen No Fee)', brandColor: '#008555' },
  'fiserv_citizens-private-bank': { name: 'Citizens Private Bank', brandColor: '#646F87' },
  fiserv_citizens: { name: 'Fiserv Citizens', brandColor: '#008555' },
  'fiserv_first-financial': { name: 'Fiserv First Financial', brandColor: '#00508D' },
  fiserv_fulton: { name: 'Fiserv Fulton', brandColor: '#003087' },
  'fiserv_us-bank': { name: 'Fiserv US Bank', brandColor: '#235AE4' },
  fiserv_wafed: { name: 'Fiserv WaFed', brandColor: '#186CE2' },
  'fiserv_xd-demo': { name: 'Fiserv XD Demo', brandColor: '#646F87' },
  fiserv: { name: 'Fiserv', brandColor: '#00508D' },
  gusto: { name: 'Gusto', brandColor: '#00508D' },
  paypal: { name: 'PayPal', brandColor: '#0551B5' },
  sbb: { name: 'SBB', brandColor: '#0551B5' },
  'wells-fargo': { name: 'Wells Fargo', brandColor: '#A10000' },
  xero: { name: 'Xero', brandColor: '#0A8080' },
};

export function isS3ThemeEnabled(): boolean {
  return __USE_S3THEMES__ === 'TRUE';
}

export function isDevelopment(): boolean {
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1';
}

export function shouldUseS3Themes(): boolean {
  return isS3ThemeEnabled() && isDevelopment();
}

export const themes = shouldUseS3Themes() ? DYNAMIC_THEMES : THEMES;

export type StorybookTheme = keyof typeof THEMES;
