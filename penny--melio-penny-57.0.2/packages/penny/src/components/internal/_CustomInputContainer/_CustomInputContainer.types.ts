import { type BoxProps } from '@chakra-ui/react';
import { type AriaAttributes } from 'react';

import { type TextFieldProps } from '../../selectionAndInputs';

/**
 * @private
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _CustomInputContainerProps = BoxProps & Pick<TextFieldProps, 'size'> & AriaAttributes;
