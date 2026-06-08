import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createBaseIconTestKit } from '../BaseIcon/createBaseIconTestKit';

export const createIconTestKit = ({ dataTestId = DEFAULT_DATA_TEST_ID.ICON }: TestKitProps = {}) =>
  createBaseIconTestKit({ dataTestId });
