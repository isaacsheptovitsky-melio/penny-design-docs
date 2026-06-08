const fs = require('fs');
const path = require('path');

const types = process.argv[2].split(','); // Convert the comma-separated types to an array
const version = process.argv[3]; // Get the version from command line arguments
const outputPath = path.join(__dirname, '..', '..', '..', 'packages/penny/src/theme/icons/brandSymbol.generated.ts');

// Create TypeScript content
const typeContent = `
/* eslint-disable max-lines */
// Auto-generated file by https://github.com/melio/penny/actions/workflows/sync-brand-symbols.yml

import { type BrandSymbolKey } from './brandSymbol.generated.types';

const getBrandSymbolPath = (cdnUrl: string, name: string) => \`\${cdnUrl}/assets/${version}/brand-symbols/\${name}.svg\`;

export const getBrandSymbolsMap = (cdnUrl: string): Record<BrandSymbolKey, Record<'default' | 'inverse', string>> => ({
${types.map((type) => `  '${type}': { default: getBrandSymbolPath(cdnUrl, '${type}'), inverse: getBrandSymbolPath(cdnUrl, '${type}-inverse') },`).join('\n')}
});
`;

// Ensure directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

fs.writeFileSync(outputPath, typeContent.trim());

console.log(`✅ Type file generated at: ${outputPath}`);
