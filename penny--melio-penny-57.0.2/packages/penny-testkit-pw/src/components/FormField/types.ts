import type { TestKitProps } from '../../testkit.types';
import { formFieldTestKitMap } from './utils';

export type InputType = keyof typeof formFieldTestKitMap;
export type Props<T extends InputType> = TestKitProps & { inputType: T };
