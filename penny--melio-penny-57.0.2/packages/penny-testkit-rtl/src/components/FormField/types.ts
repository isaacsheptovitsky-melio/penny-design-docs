import type { TestKitProps } from '../../testkit.types';
import type { formFieldTestKitMap } from './utils';

export type InputType = keyof typeof formFieldTestKitMap;
export type Props<T extends keyof typeof formFieldTestKitMap> = TestKitProps & { inputType: T };
