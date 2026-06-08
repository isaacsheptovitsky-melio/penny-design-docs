const fs = require('fs');
const path = require('path');

const types = process.argv[2].split(','); // Convert the comma-separated types to an array
const outputPath = path.join(__dirname, '..', '..', '..', 'packages/penny/src/theme/icons/brandSymbol.generated.types.ts');

// Create TypeScript content
const typeContent = `
/* eslint-disable max-lines */
// Auto-generated file by https://github.com/melio/penny/actions/workflows/sync-brand-symbols.yml

export type BrandSymbolKey = 
${types.map(type => `  | '${type}'`).join('\n')}
`;

// Ensure directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

fs.writeFileSync(outputPath, typeContent.trim());

console.log(`✅ Type file generated at: ${outputPath}`);