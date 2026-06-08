import { type GlobalTokenRecord } from '../globalTokens.types';

type GlobalBorderLevel = 'none' | '25' | '50';

export type GlobalBorderTokens = GlobalTokenRecord<GlobalBorderLevel>;

export type GlobalBorderTokenKey = `global.${Join<PathsToStringProps<GlobalBorderTokens>, '.'>}`;
