import { type BoxProps } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';

/**
 * Props for the VisuallyHidden component.
 *
 * @extends BoxProps - All props from Chakra UI's Box component
 * @extends TestIdProp - Includes data-testid for testing purposes
 */
export type VisuallyHiddenProps = BoxProps & TestIdProp;
