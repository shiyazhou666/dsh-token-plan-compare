/**
 * Client build script: bundle client.ts with esbuild (IIFE format),
 * then wrap into DSH ModuleLoader format.
 */
import { build } from 'esbuild';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const entry = resolve(__dirname, 'src/client.ts');
const outfile = resolve(__dirname, 'lib/client.js');
const globalName = '__dsh_tpc__';

// Step 1: esbuild bundle to IIFE with a global name
const result = await build({
  entryPoints: [entry],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  globalName,
  write: false,
  logLevel: 'info',
  external: ['@deepseek-ai/cordis/client'],
});

const code = result.outputFiles[0].text;

// Step 2: wrap in ModuleLoader format
// The IIFE assigns exports to window[globalName], factory returns it.
const finalOutput = [
  `// dsh-token-plan-compare client bundle`,
  `// Generated: ${new Date().toISOString()}`,
  `window.__ModuleLoader__ && window.__ModuleLoader__.load({`,
  `  id: 'dsh-token-plan-compare',`,
  `  factory: function() {`,
  `    ${code.replace(/\n/g, '\n    ')}`,
  `    return window.${globalName} || (typeof ${globalName} !== 'undefined' ? ${globalName} : {});`,
  `  }`,
  `});`,
  '',
].join('\n');

writeFileSync(outfile, finalOutput, 'utf-8');
console.log(`\nClient bundle written to ${outfile}`);
console.log(`Size: ${(finalOutput.length / 1024).toFixed(1)} KB`);
