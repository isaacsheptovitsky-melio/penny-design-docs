import { type GlobalTokenRecord } from '../globalTokens.types';

type GlobalBorderRadiusLevel = 'none' | '50' | '75' | '100' | '200' | '300' | '400' | '600' | 'full';

export type GlobalBorderRadiusTokens = GlobalTokenRecord<GlobalBorderRadiusLevel>;

export type GlobalBorderRadiusTokenKey = `global.${Join<PathsToStringProps<GlobalBorderRadiusTokens>, '.'>}`;
