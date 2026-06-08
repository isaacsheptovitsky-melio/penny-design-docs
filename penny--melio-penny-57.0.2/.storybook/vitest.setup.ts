import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react-vite';
import { MotionGlobalConfig } from 'framer-motion';

import * as previewAnnotations from './preview';

MotionGlobalConfig.skipAnimations = true;
setProjectAnnotations([a11yAddonAnnotations, previewAnnotations]);
