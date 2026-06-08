const fs = require('fs');
const path = require('path');

const types = process.argv[2].split(','); // Convert the comma-separated types to an array
const version = process.argv[3]; // Get the version from command line arguments
const outputPath = path.join(__dirname, '..', '..', '..', 'packages/penny/src/theme/icons/brand.generated.ts');

// Create TypeScript content
const typeContent = `
/* eslint-disable max-lines */
// Auto-generated file by https://github.com/melio/penny/actions/workflows/sync-brands.yml

import { type BrandKey } from './brand.generated.types';


const getBrandPath = (cdnUrl: string, name: string) => \`\${cdnUrl}/assets/${version}/brands/\${name}.svg\`;

export const getBrandMap = (cdnUrl: string): Record<BrandKey, Record<'default' | 'neutral' | 'inverse', string>> => ({
${types.map((type) => `  '${type}': { default: getBrandPath(cdnUrl, '${type}'), neutral: getBrandPath(cdnUrl, '${type}-neutral'), inverse: getBrandPath(cdnUrl, '${type}-inverse') },`).join('\n')}
});
`;

// Ensure directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

fs.writeFileSync(outputPath, typeContent.trim());

console.log(`✅ Type file generated at: ${outputPath}`);
