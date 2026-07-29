import fs from 'fs';
import path from 'path';

// Optional helper: copy Google's Material Design `outlined` SVG icons from the
// workspace `node_modules` into this package's `src/svg` folder.
// This script searches upward from the current package to locate the installed
// `material-design-icons` package and copies any SVGs that reference the
// `outlined` variant. If none are found, it will fall back to copying any SVGs.

const root = path.resolve(new URL(import.meta.url).pathname, '..', '..');
const dest = path.join(root, 'src', 'svg');
if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

function findPackageRoot(pkgName) {
  let dir = process.cwd();
  const rootDir = path.parse(dir).root;
  while (true) {
    const candidate = path.join(dir, 'node_modules', pkgName);
    if (fs.existsSync(candidate)) return candidate;
    if (dir === rootDir) break;
    dir = path.dirname(dir);
  }
  return null;
}

function walkCollectSvgs(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      try { walkCollectSvgs(p, results); } catch (e) {}
    } else if (entry.isFile() && p.toLowerCase().endsWith('.svg')) {
      results.push(p);
    }
  }
  return results;
}

try {
  const pkgRoot = findPackageRoot('material-design-icons');
  if (!pkgRoot) {
    console.error('material-design-icons package not found in any ancestor node_modules');
    process.exit(1);
  }

  // Collect only 24px SVGs from the official `svg/design` folders.
  const allSvgs = walkCollectSvgs(pkgRoot);
  const toCopyAll = allSvgs.filter((p) => {
    const normalized = p.toLowerCase();
    return normalized.includes(`${path.sep}svg${path.sep}design${path.sep}`) && /_24px\.svg$/i.test(normalized);
  });

  if (toCopyAll.length === 0) {
    console.error('No outlined 24px SVGs found inside material-design-icons package at', pkgRoot);
    process.exit(1);
  }

  const cleanName = (filePath) => {
    const name = path.basename(filePath, '.svg');
    return name
      .replace(/^ic_/, '')
      .replace(/_24px$/i, '')
      .replace(/_black$|_white$/i, '')
      .replace(/_48px$/i, '')
      .replace(/__+/g, '_');
  };

  // Remove any existing dest icons that are not part of this fresh build
  const existingSvgs = fs.readdirSync(dest).filter((f) => f.endsWith('.svg'));
  const newNames = new Set(toCopyAll.map((p) => cleanName(p)));
  for (const existing of existingSvgs) {
    const base = path.basename(existing, '.svg');
    if (!newNames.has(base)) {
      try { fs.unlinkSync(path.join(dest, existing)); } catch (e) {}
    }
  }

  for (const p of toCopyAll) {
    const name = cleanName(p);
    const destPath = path.join(dest, `${name}.svg`);
    fs.copyFileSync(p, destPath);
  }
  console.log(`Copied ${toCopyAll.length} outlined 24px SVGs from ${pkgRoot} to ${dest}`);
} catch (err) {
  console.error(err && err.message ? err.message : String(err));
  process.exit(1);
}
