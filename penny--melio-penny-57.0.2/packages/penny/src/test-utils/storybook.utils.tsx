import { type Decorator } from '@storybook/react-vite';
import isChromatic from 'chromatic/isChromatic';

import type { ThemeBreakpointsKey } from '../theme/foundations/breakpoints';

/**
 * Our internal wrapper around `chromatic/isChromatic`.
 *
 * Returns `true` if running within Chromatic, `false` otherwise.
 * @argument window - The window object whose `navigator` and/or `location` is
 * used to determine if running in Chromatic.
 */
export const isUsingVisualTesting = isChromatic;

export const fullScreenChromaticDecorator = ((Story: () => React.JSX.Element) =>
  isUsingVisualTesting() ? <div style={{ width: '1200px', height: '1080px' }}>{Story()}</div> : Story()) as Decorator;

export const getUnionTypeSummary = (unionType: string[]) => unionType.join(' | ');

export const setChromaticViewports = (
  // https://meliorisk.atlassian.net/browse/ME-40319
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stories: any[],
  breakpoints: ThemeBreakpointsKey[] = ['xs', 's', 'm', 'l', 'xl']
) => {
  stories.forEach((story) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    story.parameters = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...story.parameters,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      chromatic: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ...story.parameters?.['chromatic'],
        // This makes it so they are taken from the viewports defined in preview.tsx
        viewports: breakpoints,
      },
    };
  });
};

/**
 * Extract a specific component's source code from the raw file.
 * Uses Vite's built-in [raw import](https://vite.dev/guide/assets#importing-asset-as-string)
 * - Properly handles string literals (which may contain brackets)
 * - Tracks both parentheses and curly braces separately
 * - Handles escaped characters in strings
 * - Is resilient to different code formatting styles
 * - Ensures the complete component definition is captured
 */

export const extractComponentSource = (rawSource: string, componentName: string): string => {
  // Find the starting point of the component definition
  const componentStartRegex = new RegExp(`export\\s+const\\s+${componentName}\\s*=\\s*\\(`);
  const componentStartMatch = componentStartRegex.exec(rawSource);

  if (!componentStartMatch) return `// Could not find component ${componentName}`;

  const componentStart = componentStartMatch.index;
  let bracketCount = 0;
  let curlyBraceCount = 0;
  let inString = false;
  let stringChar = '';
  let prevChar = '';
  let endPos = componentStart;

  // Start scanning after the function parameter list opening bracket
  const paramListStart = rawSource.indexOf('(', componentStart);

  // Scan character by character through the file
  for (let i = paramListStart; i < rawSource.length; i++) {
    const char = rawSource[i];

    // Handle string literals to avoid counting brackets inside strings
    if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }

    // Only count brackets if we're not inside a string
    if (!inString) {
      if (char === '(') {
        bracketCount++;
      } else if (char === ')') {
        bracketCount--;
      } else if (char === '{') {
        curlyBraceCount++;
      } else if (char === '}') {
        curlyBraceCount--;
      }
    }

    // If all brackets and braces are balanced and we hit a semicolon, we're done
    if (bracketCount === 0 && curlyBraceCount === 0 && char === ';') {
      endPos = i + 1;
      break;
    }

    prevChar = char ?? '';
  }

  // Extract the component source and remove the "export" keyword
  return rawSource.substring(componentStart, endPos).replace('export ', '');
};
