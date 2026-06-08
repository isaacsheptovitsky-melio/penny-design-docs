import { createElement } from 'react';
import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
import { Storybook } from 'storybook-utils';

import { sbDarkTheme, sbLightTheme } from './sb-themes';
import { getStoryTitleParts, removeTagFromName } from './utils/getStoryTitleParts';
import { getPreferredColorScheme } from './utils/utils';

const isDarkMode = getPreferredColorScheme() === 'dark';

addons.setConfig({
  toolbar: {
    title: { hidden: true },
    remount: { hidden: true },
    zoom: { hidden: true },
    copy: { hidden: true },
    fullscreen: { hidden: true },
  },
  sidebar: {
    renderLabel: (item) =>
      item.name.includes('[composable]')
        ? removeTagFromName(item.name, '[composable]')
        : createElement(Storybook.SidebarItem, getStoryTitleParts(item.name)),
  },
  theme: create(isDarkMode ? sbDarkTheme : sbLightTheme),
});
