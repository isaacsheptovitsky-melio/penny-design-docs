const fs = require('fs');
const path = require('path');

const types = process.argv[2].split(','); // Convert the comma-separated types to an array
const version = process.argv[3]; // Get the version from command line arguments
const outputPath = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'packages/penny/src/theme/defaultIllustrations/defaultIllustrations.generated.ts'
);

// Create TypeScript content
const typeContent = `
/* eslint-disable max-lines */
// Auto-generated file by https://github.com/melio/penny/actions/workflows/sync-illustrations.yml

import { type ComponentType } from 'react';

import { type ThemeIllustrationType } from './defaultIllustrations.generated.types';

const getIllustrationPath = (cdnUrl: string, name: string) => \`\${cdnUrl}/assets/${version}/illustrations/\${name}.svg\`;

export const getDefaultIllustrations = (
  cdnUrl: string
): Record<ThemeIllustrationType, ComponentType | string> => ({
${types.map((type) => `  '${type}': getIllustrationPath(cdnUrl, '${type}'),`).join('\n')}
});
`;

// Ensure directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

fs.writeFileSync(outputPath, typeContent.trim());

console.log(`✅ Type file generated at: ${outputPath}`);
