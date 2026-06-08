import { type TestIdProp } from '@melio/penny-utils';
import { type ButtonHTMLAttributes } from 'react';

export type ActionAreaProps = ButtonHTMLAttributes<HTMLButtonElement> & TestIdProp;
