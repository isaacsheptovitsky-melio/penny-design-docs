const fs = require('fs');
const path = require('path');

const types = process.argv[2].split(','); // Convert the comma-separated types to an array
const version = process.argv[3]; // Get the version from command line arguments
const outputPath = path.join(__dirname, '..', '..', '..', 'packages/penny/src/theme/icons/icons.generated.ts');

// Create TypeScript content
const typeContent = `
/* eslint-disable max-lines */
// Auto-generated file by https://github.com/melio/penny/actions/workflows/sync-icons.yml

import { type ThemeIcons } from './icon.types';

const getIconPath = (cdnUrl: string, size: string, name: string) => \`\${cdnUrl}/assets/${version}/icons/\${size}/\${name}.svg\`;

export const getDefaultIconsMap = (cdnUrl: string): ThemeIcons => ({
${types.map((type) => `  '${type}': { small: getIconPath(cdnUrl, 'small', '${type}'), medium: getIconPath(cdnUrl, 'medium', '${type}') },`).join('\n')}
});
`;

// Ensure directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

fs.writeFileSync(outputPath, typeContent.trim());

console.log(`✅ Type file generated at: ${outputPath}`);
