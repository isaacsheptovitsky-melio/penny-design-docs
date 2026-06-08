const fs = require('fs');
const path = require('path');

const types = process.argv[2].split(','); // Convert the comma-separated types to an array
const version = process.argv[3]; // Get the version from command line arguments
const outputPath = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'packages/penny/src/theme/icons/assets/flags/flags.generated.ts'
);

// Create TypeScript content
const typeContent = `
/* eslint-disable max-lines */
// Auto-generated file by https://github.com/melio/penny/actions/workflows/sync-flags.yml

import { type FlagKey } from './flags.generated.types';

const getFlagPath = (cdnUrl: string, name: string) => \`\${cdnUrl}/assets/${version}/flags/\${name}.svg\`;

export const getFlagsMap = (cdnUrl: string): Record<FlagKey, string> => ({
${types.map((type) => `  '${type}': getFlagPath(cdnUrl, '${type}'),`).join('\n')}
});
`;

// Ensure directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

fs.writeFileSync(outputPath, typeContent.trim());

console.log(`✅ Type file generated at: ${outputPath}`);
