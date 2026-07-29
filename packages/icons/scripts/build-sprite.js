import fs from 'fs';
import path from 'path';

// Simple SVG sprite builder
// - reads all .svg files from src/svg
// - wraps each in a <symbol id="icon-name">...</symbol>
// - outputs dist/sprite.svg

const root = path.resolve(new URL(import.meta.url).pathname, '..', '..');
const svgDir = path.join(root, 'src', 'svg');
const outDir = path.join(root, 'dist');
const outFile = path.join(outDir, 'sprite.svg');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(svgDir).filter(f => f.endsWith('.svg'));

let symbols = [];

for (const file of files) {
  const name = path.basename(file, '.svg');
  const content = fs.readFileSync(path.join(svgDir, file), 'utf8');
  // Extract inner SVG content
  const match = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  const inner = match ? match[1] : content;
  // Extract viewBox if present
  const vbMatch = content.match(/viewBox="([^"]+)"/i);
  const viewBox = vbMatch ? ` viewBox="${vbMatch[1]}"` : '';
  symbols.push(`<symbol id="${name}"${viewBox}>${inner}</symbol>`);
}

const sprite = `<?xml version="1.0" encoding="utf-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${symbols.join('\n')}\n</svg>`;

fs.writeFileSync(outFile, sprite, 'utf8');
console.log('Wrote', outFile);