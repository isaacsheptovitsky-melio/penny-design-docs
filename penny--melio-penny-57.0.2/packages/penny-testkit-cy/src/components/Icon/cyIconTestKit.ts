import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createCyBaseIconTestKit } from '../BaseIcon/cyBaseIconTestKit';

export const createCyIconTestKit = ({ dataTestId = DEFAULT_DATA_TEST_ID.ICON }: TestKitProps = {}) =>
  createCyBaseIconTestKit({ dataTestId });
