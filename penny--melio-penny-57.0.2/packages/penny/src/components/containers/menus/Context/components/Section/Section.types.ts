import { type TestIdProp } from '@melio/penny-utils';
import { type PropsWithChildren, type ReactNode } from 'react';

export type SectionProps = PropsWithChildren<{ label: ReactNode }> & TestIdProp;
