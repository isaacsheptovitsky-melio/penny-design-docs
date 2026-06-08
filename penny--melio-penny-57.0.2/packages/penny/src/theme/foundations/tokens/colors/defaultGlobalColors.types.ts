import { type GlobalTokenRecord } from '../globalTokens.types';

type GlobalColorLevel = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '1000';
type GlobalAlphaColorLevel =
  | 'A0'
  | 'A1'
  | 'A2'
  | 'A5'
  | 'A10'
  | 'A15'
  | 'A35'
  | 'A50'
  | 'A60'
  | 'A65'
  | 'A75'
  | 'A80'
  | 'AD0'
  | 'AD1'
  | 'AD2'
  | 'AD5'
  | 'AD10'
  | 'AD15'
  | 'AD35'
  | 'AD50'
  | 'AD60'
  | 'AD65'
  | 'AD75'
  | 'AD80';
type GlobalDecorativeLevel = '1' | '2' | '3' | '4' | '5';

export type GlobalColorTokens = {
  neutral: GlobalTokenRecord<GlobalColorLevel | GlobalAlphaColorLevel>;
  brand: GlobalTokenRecord<GlobalColorLevel>;
  brandSecondary: GlobalTokenRecord<GlobalColorLevel>;
  critical: GlobalTokenRecord<GlobalColorLevel>;
  success: GlobalTokenRecord<GlobalColorLevel>;
  warning: GlobalTokenRecord<GlobalColorLevel>;
  informative: GlobalTokenRecord<GlobalColorLevel>;
  decorative: GlobalTokenRecord<GlobalDecorativeLevel>;
  focus: GlobalTokenRecord<'primary' | 'inverse'>;
};

export type GlobalColorTokenKey = `global.${Join<PathsToStringProps<GlobalColorTokens>, '.'>}`;
