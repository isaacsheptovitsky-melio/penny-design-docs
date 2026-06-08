import { cloneDeep as cloneDeepESToolkit } from 'es-toolkit';

export const cloneDeep = <T extends object>(obj: T = {} as T): T => cloneDeepESToolkit(obj);
