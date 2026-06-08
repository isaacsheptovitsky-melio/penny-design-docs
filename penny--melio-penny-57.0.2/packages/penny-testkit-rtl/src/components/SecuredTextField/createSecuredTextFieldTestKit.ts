import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createIconButtonTestKit } from '../IconButton/createIconButtonTestKit';
import { createTextFieldTestKit } from '../TextField/createTextFieldTestKit';

export function createSecuredTextFieldTestKit({
  dataTestId = DEFAULT_DATA_TEST_ID.SECURED_TEXT_FIELD,
}: TestKitProps = {}) {
  const textFieldTestKit = createTextFieldTestKit({ dataTestId });

  const maskIconButtonTestKit = createIconButtonTestKit({
    dataTestId: `${dataTestId}-input-visibility-icon-button`,
  });

  const getIsTextVisible = () => textFieldTestKit.getElement().type === 'text';

  const toggleTextVisibility = async (isVisible?: boolean) => {
    const isCurrentlyVisible = getIsTextVisible();

    if (isVisible === undefined) {
      await maskIconButtonTestKit.click();
    } else if (isVisible && !isCurrentlyVisible) {
      await maskIconButtonTestKit.click();
    } else if (!isVisible && isCurrentlyVisible) {
      await maskIconButtonTestKit.click();
    }
  };

  return {
    ...textFieldTestKit,
    maskIconButton: maskIconButtonTestKit,
    getIsTextVisible,
    toggleTextVisibility,
  };
}
