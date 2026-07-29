import fs from 'fs';
import path from 'path';

const svgDir = path.join(new URL(import.meta.url).pathname, '..', 'src', 'svg');
let icons = {};
try {
  const files = fs.readdirSync(svgDir).filter((f) => f.endsWith('.svg'));
  for (const f of files) {
    const name = path.basename(f, '.svg');
    icons[name] = fs.readFileSync(path.join(svgDir, f), 'utf8');
  }
} catch (e) {
  icons = {
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
}

export { icons };
export default icons;
